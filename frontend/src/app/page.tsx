'use client';
import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { PlaceholdersAndVanishInput } from '../components/ui/placeholders-and-vanish-input';
import { Instagram, Twitter, Youtube } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExtractedPostView } from '@/components/Home/ExtractedPost/extractedPost';
import {
    AmazonProductListing,
    ExtractedPost,
} from '@/types/index.js';
import { useAuth } from '@/components/global/AuthProvider';
import { redirect } from 'next/navigation';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/Home/GenerateProduct/ProductCard';
import NProgress from 'nprogress';

const samplePost: ExtractedPost = {
  _id: "1",
  content: "Sample Post 1",
  owner: "sample_user",
  url: "https://placehold.co/300x300.png?text=Image+12",
  images: [
    { url: "https://placehold.co/300x300?text=Image+1", publicId: "1" },
    { url: "https://placehold.co/300x300?text=Image+2", publicId: "2" },
    { url: "https://placehold.co/300x300?text=Image+3", publicId: "3" },
  ],
};

const HomePage = () => {
    const [link, setLink] = useState('');
    const { user, setUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isListingLoading, setIsListingLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('post');
    const [isGeneratingProduct, setIsGeneratingProduct] =
        useState(false);
    const [posts, setAllPosts] = useState<ExtractedPost[] | null>([
        samplePost,
    ]);
    const [product, setProduct] =
        useState<AmazonProductListing | null>(null);
    const [error, setError] = useState('');

    const addPost = async (url: string) => {
        try {
            setIsLoading(true);
            setIsListingLoading(true);
            NProgress.start();
            setError('');
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/posts/url`,
                { url },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            setAllPosts([typeof response.data == 'object' ? response.data : response.data.data]);

            if (response.data.url) {
                addProduct(response.data._id);
            }
        } catch (err) {
            console.log(err);
            setIsListingLoading(false);
            setError('Failed to load content. Please try again.');
        } finally {
            setIsLoading(false);
            NProgress.done();
        }
    };

    const addProduct = async (_id: string) => {
        try {
            NProgress.start();
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/products/analyze/${_id}`,
                {},
                { withCredentials: true }
            );

            if (response.data) {
                setProduct(response.data);
            } else if (response.status === 401) {
                redirect('/auth');
            } else if (response.status === 403) {
                redirect('/auth');
            } //  else {
                // console.log(response);
            // }
        } catch (err) {
            console.error(err);
        } finally {
            NProgress.done();
            setIsListingLoading(false);
        }
    };

    const handleGenerateProduct = async () => {
        if (!posts?.[0]?.url) {
            setError('Please add a post first');
            return;
        }
        setIsGeneratingProduct(true);
        setError('');
        try {
            NProgress.start();
            await addProduct(posts[0].url);
            setActiveTab('listing');
        } catch (err) {
            console.error(err);
            setError('Failed to generate product listing');
        } finally {
            setIsGeneratingProduct(false);
            NProgress.done();
        }
    };

    const handleDelete = (id: string) => {
        // console.log('Deleting Post:', id);
        setAllPosts((prev: ExtractedPost[] | null) => {
            if (!prev) return null;
            return prev.filter((post) => post._id !== id);
        });
        // API call can be added here if needed
    };

    const handlePaste = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setLink(link.trim());
        await addPost(link);
    };

    const handleTokens = async () => {
        try {
            if (!user) {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/users/verify`,
                    // https://socio-ai-8chs.onrender.com/api/users/verify
                    { withCredentials: true }
                );

                if (res.status === 200 && res.data) {
                    setUser(res.data);
                } else {
                    redirect('/auth');
                }
            }
        } catch (error: AxiosError | any) {
            if (
                error?.response &&
                [403, 500].includes(error?.response?.status)
            ) {
                console.error('Token verification failed:', error);
            }
            redirect('/auth');
        }
    };

    useEffect(() => {
        handleTokens();
    }, []);

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Card className="mb-8 bg-gray-900 border-gray-800 py-6">
                    <CardHeader>
                        <CardTitle className="text-center text-5xl text-gray-100">
                            Import Social Media Content
                        </CardTitle>
                        <CardDescription className="text-center text-gray-400">
                            <div className="flex justify-center space-x-4 my-2 mt-6">
                                <Instagram className="h-8 w-8 text-pink-500" />
                                <Twitter className="h-8 w-8 text-blue-400" />
                                <Youtube className="h-8 w-8 text-red-500" />
                            </div>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PlaceholdersAndVanishInput
                            placeholders={[
                                'Paste Instagram link...',
                                'Paste Twitter link...',
                                'Paste YouTube link...',
                            ]}
                            onChange={(e) => setLink(e.target.value)}
                            onSubmit={handlePaste}
                        />
                    </CardContent>
                </Card>

                {error && (
                    <Alert
                        variant="destructive"
                        className="mb-6 bg-red-900 border-red-800"
                    >
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <Tabs
                    defaultValue="post"
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="space-y-4 border-b-2 border-white"
                >
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger
                            value="post"
                            className={`${
                                activeTab === 'post'
                                    ? 'bg-gray-800'
                                    : ''
                            } py-2`}
                        >
                            Post
                            {isLoading && (
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ms-2 text-dark-mode"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                                        opacity=".25"
                                    />
                                    <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
                                        <animateTransform
                                            attributeName="transform"
                                            type="rotate"
                                            dur="0.75s"
                                            values="0 12 12;360 12 12"
                                            repeatCount="indefinite"
                                        />
                                    </path>
                                </svg>
                            )}
                        </TabsTrigger>
                        <TabsTrigger
                            value="listing"
                            className={`${
                                activeTab === 'listing'
                                    ? 'bg-gray-800'
                                    : ''
                            } py-2`}
                        >
                            Listing
                            {isListingLoading && (
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ms-2 text-dark-mode"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                                        opacity=".25"
                                    />
                                    <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
                                        <animateTransform
                                            attributeName="transform"
                                            type="rotate"
                                            dur="0.75s"
                                            values="0 12 12;360 12 12"
                                            repeatCount="indefinite"
                                        />
                                    </path>
                                </svg>
                            )}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="post" className="space-y-4">
                        <ExtractedPostView
                            post={posts?.[0] || null}
                            handleDelete={handleDelete}
                        />
                        {/* {posts?.[0] && (
                            <Button
                                onClick={handleGenerateProduct}
                                disabled={isGeneratingProduct}
                                className="w-full mt-4"
                            >
                                {isGeneratingProduct
                                    ? 'Generating...'
                                    : 'Generate Product Listing'}
                            </Button>
                        )} */}
                    </TabsContent>

                    <TabsContent value="listing">
                        {product && <ProductCard product={product} />}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default HomePage;

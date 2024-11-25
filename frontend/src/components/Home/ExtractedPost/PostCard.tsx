'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { ExtractedPost } from '@/types/index.js';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export const PostCard = ({
    post,
    handlePostDelete,
}: {
    post: ExtractedPost;
    key: string;
    handlePostDelete: (id: string) => void;
}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        if (post?.images?.length == 0 && post.videos?.length == 0) {
            setIsFlipped(true);
        }
    }, [post]);

    return (
        <Card
            className="w-full md:max-w-full lg:max-w-full relative mb-4 cursor-pointer hover:shadow-lg transition-shadow flex flex-col md:flex-row"
            onClick={() => setIsFlipped(!isFlipped)}
            title={
                (post.images?.length ?? 0) <= 0
                    ? 'No Media To Show'
                    : post?.content?.slice(0, 20) + '...'
            }
        >
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handlePostDelete(post._id);
                }}
                className="absolute top-2 right-2 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                aria-label="Delete post"
            >
                <Trash2 className="h-5 w-5 text-gray-500 hover:text-red-500" />
            </button>

            <div className="md:w-1/3">
                {post?.images?.[0] ? (
                    <div className="">
                        <Image
                            src={post.images[0].url}
                            alt={post.content}
                            width={100}
                            height={100}
                            className="object-cover w-full h-full rounded-l-lg"
                        />
                    </div>
                ) : (
                    <div className="w-full h-full flex justify-center items-center">
                            <p>No media found</p>
                    </div>
                )}
            </div>

            <CardContent className="p-4 md:w-2/3 flex flex-col justify-between">
                <div>
                    <h4 className="text-xl font-semibold mb-2">
                        {post?.content}
                    </h4>
                </div>
                <div>
                    <Button
                        variant={'link'}
                        className="bg-white text-black"
                    >
                        <a href={post.url} target="_blank">
                            View original post
                        </a>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default PostCard;

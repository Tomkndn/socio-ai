'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import { Filter, SortAsc } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AmazonProductListing } from '@/types';
import ProdListingCard from '@/components/amazon/ProdListing';

const sampleProducts: AmazonProductListing[] = [
    {
        _id: '1',
        title: 'Wireless Earbuds Pro',
        price: '$129',
        currency: 'USD',
        images: [
            {
                url: '/api/placeholder/400/400',
                publicId: '010',
            },
        ],
        status: 'listed',
        stock: 11,
        category: ['Electronics'],
        description: 'High-quality wireless earbuds',
    },
    {
        _id: '2',
        title: 'Smart Watch Series X',
        price: '200',
        currency: '$USD',
        images: [
            {
                url: '/api/placeholder/400/400',
                publicId: '010',
            },
        ],
        status: 'draft',
        stock: 7,
        category: ['Wearables'],
        description: 'Advanced smart watch with multiple features',
    },
    {
        _id: '3',
        title: 'Premium Headphones',
        price: '$300',
        currency: 'USD',
        images: [
            {
                url: '/api/placeholder/400/400',
                publicId: '010',
            },
        ],
        status: 'listed',
        stock: 70,
        category: ['Audio'],
        description: 'High-fidelity premium headphones',
    },
];

const AmazonPage = () => {
    // const [sortBy, setSortBy] = useState('newest');
    // const [favorites, setFavorites] = useState(new Set());
    const [products, setProducts] = useState<
        AmazonProductListing[] | []
    >([]);

    // const toggleFavorite = (productId: string) => {
    //     setFavorites((prev) => {
    //         const newFavorites = new Set(prev);
    //         if (newFavorites.has(productId)) {
    //             newFavorites.delete(productId);
    //         } else {
    //             newFavorites.add(productId);
    //         }
    //         return newFavorites;
    //     });
    // };

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <h1 className="text-2xl font-bold mb-4 md:mb-0">
                        Your Amazon Products
                    </h1>
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full sm:w-auto border-gray-700 text-black"
                                >
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filter
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-900 border-gray-800">
                                <DropdownMenuLabel className="text-gray-300">
                                    Categories
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-gray-800" />
                                <DropdownMenuItem className="text-gray-300 focus:bg-gray-800">
                                    Electronics
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-gray-300 focus:bg-gray-800">
                                    Wearables
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-gray-300 focus:bg-gray-800">
                                    Audio
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full sm:w-auto border-gray-700 text-black"
                                >
                                    <SortAsc className="h-4 w-4 mr-2" />
                                    Sort By
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-900 border-gray-800">
                                <DropdownMenuItem className="text-gray-300 focus:bg-gray-800">
                                    Newest First
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-gray-300 focus:bg-gray-800">
                                    Price: Low to High
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-gray-300 focus:bg-gray-800">
                                    Price: High to Low
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-gray-300 focus:bg-gray-800">
                                    Rating
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 bg-gray-900 border-gray-800">
                        <TabsTrigger
                            value="all"
                            className="data-[state=active]:bg-gray-800"
                        >
                            All Products
                        </TabsTrigger>
                        <TabsTrigger
                            value="listings"
                            className="data-[state=active]:bg-gray-800"
                        >
                            Your Listings
                        </TabsTrigger>
                        <TabsTrigger
                            value="watchlist"
                            className="data-[state=active]:bg-gray-800"
                        >
                            Your Watchlist
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map(
                                (product: AmazonProductListing) => {
                                    if (product.stock === 0) {
                                        return null;
                                    }
                                    return (
                                        <ProdListingCard
                                            key={product._id}
                                            product={product}
                                            // isFavourite={favorites.has(product._id)}
                                            // toggleFavorite={toggleFavorite}
                                        />
                                    );
                                }
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="listings" className="mt-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products
                                .filter(
                                    (p) =>
                                        p.status
                                            ?.toString()
                                            .toLowerCase() !== 'draft'
                                )
                                .map((product) => (
                                    <ProdListingCard
                                        key={product._id}
                                        product={product}
                                        // isFavourite={favorites.has(product._id)}
                                        // toggleFavorite={toggleFavorite}
                                    />
                                ))}
                        </div>
                    </TabsContent>

                    {/* <TabsContent value="watchlist" className="mt-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products
                                // .filter((p) => favorites.has(p._id))
                                .map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        // isFavourite={favorites.has(product._id)}
                                        toggleFavorite={toggleFavorite}
                                    />
                                ))}
                        </div>
                    </TabsContent> */}
                </Tabs>
            </div>
        </div>
    );
};

export default AmazonPage;

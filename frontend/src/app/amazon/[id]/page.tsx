'use client';
import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    ChevronLeft,
    ChevronRight,
    Play,
    Pause,
    ShoppingCart,
    Heart,
} from 'lucide-react';

const ProductDetail = () => {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const product = {
        title: 'Wireless Earbuds Pro',
        price: '$129.99',
        description:
            'High-quality wireless earbuds with noise cancellation',
        media: [
            { type: 'video', url: '/api/placeholder/800/600' },
            { type: 'image', url: '/api/placeholder/800/600' },
            { type: 'image', url: '/api/placeholder/800/600' },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Media Section */}
                    <div className="space-y-4">
                        <Card className="overflow-hidden">
                            <div className="relative">
                                {product.media[currentMediaIndex]
                                    .type === 'video' ? (
                                    <div className="relative w-full h-96">
                                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                                            <Play className="h-12 w-12 text-gray-400" />
                                        </div>
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="absolute bottom-4 right-4"
                                            onClick={() =>
                                                setIsPlaying(
                                                    !isPlaying
                                                )
                                            }
                                        >
                                            {isPlaying ? (
                                                <Pause className="h-4 w-4" />
                                            ) : (
                                                <Play className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                ) : (
                                    <img
                                        src={
                                            product.media[
                                                currentMediaIndex
                                            ].url
                                        }
                                        alt={`Product ${
                                            currentMediaIndex + 1
                                        }`}
                                        className="w-full h-96 object-cover"
                                    />
                                )}
                            </div>
                        </Card>

                        {/* Thumbnail Navigation */}
                        <div className="flex space-x-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                    setCurrentMediaIndex(
                                        Math.max(
                                            0,
                                            currentMediaIndex - 1
                                        )
                                    )
                                }
                                disabled={currentMediaIndex === 0}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>

                            <div className="flex-1 flex space-x-2 overflow-x-auto py-2">
                                {product.media.map((media, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            setCurrentMediaIndex(
                                                index
                                            )
                                        }
                                        className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${
                                            currentMediaIndex ===
                                            index
                                                ? 'ring-2 ring-blue-500'
                                                : ''
                                        }`}
                                    >
                                        {media.type === 'video' ? (
                                            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                                                <Play className="h-6 w-6 text-gray-400" />
                                            </div>
                                        ) : (
                                            <img
                                                src={media.url}
                                                alt={`Thumbnail ${
                                                    index + 1
                                                }`}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                    setCurrentMediaIndex(
                                        Math.min(
                                            product.media.length - 1,
                                            currentMediaIndex + 1
                                        )
                                    )
                                }
                                disabled={
                                    currentMediaIndex ===
                                    product.media.length - 1
                                }
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">
                                    {product.title}
                                </CardTitle>
                                <CardDescription className="text-xl font-semibold">
                                    {product.price}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    {product.description}
                                </p>
                            </CardContent>
                            <CardFooter className="flex space-x-4">
                                <Button className="flex-1">
                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                    Add to Cart
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Heart className="h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
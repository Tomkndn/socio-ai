import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AmazonProductListing } from '@/types/index.js';

const ProductCard = ({
    product,
}: {
    product?: AmazonProductListing;
}) => {
    if (!product) return null;

    return (
        <Card className="bg-gray-900 border-gray-800 overflow-hidden">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl text-gray-100">
                            {product.title}
                        </CardTitle>
                        {product.brand && (
                            <CardDescription className="text-gray-400">
                                Brand: {product.brand}
                            </CardDescription>
                        )}
                    </div>
                    <Badge
                        variant={
                            product.status === 'listed'
                                ? 'default'
                                : 'secondary'
                        }
                    >
                        {product.status || 'draft'}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.images && product.images.length > 0 && (
                        <div className="space-y-4">
                            <div className="aspect-square relative overflow-hidden rounded-lg">
                                <img
                                    src={product.images[0].url}
                                    alt={product.title}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            {product.images.length > 1 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {product.images
                                        .slice(1, 5)
                                        .map((img, idx) => (
                                            <div
                                                key={idx}
                                                className="aspect-square relative overflow-hidden rounded-lg"
                                            >
                                                <img
                                                    src={img.url}
                                                    alt={`${
                                                        product.title
                                                    } - ${idx + 2}`}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-100">
                                Price
                            </h3>
                            <p className="text-2xl font-bold text-green-500">
                                {product.currency} {product.price}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-100 mb-2">
                                Description
                            </h3>
                            <p className="text-gray-300">
                                {product.description}
                            </p>
                        </div>

                        {product.category &&
                            product.category.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-100 mb-2">
                                        Categories
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {product.category.map(
                                            (cat, idx) => (
                                                <Badge
                                                    key={idx}
                                                    variant="outline"
                                                >
                                                    {cat}
                                                </Badge>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                        <div>
                            <h3 className="text-xl font-semibold text-gray-100 mb-2">
                                Stock Status
                            </h3>
                            <Badge
                                variant={
                                    product?.stock > 0
                                        ? 'default'
                                        : 'destructive'
                                }
                            >
                                {product.stock > 0
                                    ? 'In Stock'
                                    : 'Out of Stock'}
                            </Badge>
                            {product.stock > 0 && (
                                <span className="ml-2 text-gray-400">
                                    {product.stock} units available
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {product.videos && product.videos.length > 0 && (
                    <div>
                        <h3 className="text-xl font-semibold text-gray-100 mb-4">
                            Product Videos
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {product.videos.map((video, idx) => (
                                <div
                                    key={idx}
                                    className="aspect-video relative overflow-hidden rounded-lg"
                                >
                                    <video
                                        src={video.url}
                                        controls
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ProductCard;

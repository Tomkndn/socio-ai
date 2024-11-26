export interface ExtractedPost {
    _id: string;
    owner: string;
    content: string;
    url?: string;
    images?: MediaLinks[];
    videos?: MediaLinks[];
}

export interface AmazonProductListing {
    _id: string;
    brand?: string;
    url?: string;
    title: string;
    description: string;
    price: string;
    currency: string;
    stock: number | 0;
    category?: string[];
    status?: 'draft' | 'listed';
    images?: MediaLinks[];
    videos?: MediaLinks[];
}

export interface ExtractedMedia {
    url: string;
    type: 'image' | 'video';
}

export interface MediaLinks{
    url: string;
    publicId: string;
}
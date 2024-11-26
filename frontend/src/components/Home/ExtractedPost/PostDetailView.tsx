'use client';
import { useState } from 'react';
import { ExtractedPost } from '@/types/index.js';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Code } from 'lucide-react';

interface DetailViewProps {
    post: ExtractedPost;
    onClose: () => void;
}

export const DetailView = ({ post, onClose }: DetailViewProps) => {
    const [showMedia, setShowMedia] = useState(false);

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
            <div className="container mx-auto h-full py-8">
                <div className="bg-gray-900 rounded-lg h-full overflow-hidden">
                    <div className="flex h-full">
                        {/* Media Section */}
                        <div className="w-1/2 h-full bg-black">
                            {post.videos?.length ?? 0 ? (
                                <video
                                    src={post.videos?.[0]?.url || ''}
                                    controls
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <img
                                    src={post.images?.[0]?.url || ''}
                                    alt={post.content.slice(0, 10) + '....png'}
                                    className="w-full h-full object-contain"
                                />
                            )}
                        </div>

                        {/* Details Section */}
                        <div className="w-1/2 p-6 overflow-y-auto">
                            <h2 className="text-2xl font-bold mb-4">
                                {post.content.slice(0, 10) + '....png'}
                            </h2>
                            <p className="text-gray-300 mb-6">
                                {post.content}
                            </p>
                            <Button
                                onClick={() =>
                                    setShowMedia(!showMedia)
                                }
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                <Code className="mr-2 h-4 w-4" />
                                View Media
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Media Viewer Dialog */}
            <Dialog
                open={showMedia}
                onOpenChange={() => setShowMedia(false)}
            >
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <div className="aspect-video w-full">
                        {post.videos?.length ?? 0 ? (
                            <video
                                src={post.videos?.[0]?.url || ''}
                                controls
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <img
                                src={post.images?.[0]?.url || ''}
                                alt=""
                                className="w-full h-full object-contain"
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

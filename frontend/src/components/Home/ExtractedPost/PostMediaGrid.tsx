'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '../../ui/dialog';
import Image from 'next/image';
import { ExtractedMedia, MediaLinks } from '@/types';

interface MediaGridProps {
    media: MediaLinks[];
    type: 'image' | 'video';
}

export const MediaGrid = ({ media, type }: MediaGridProps) => {
    const [selectedMedia, setSelectedMedia] = useState<string | null>(
        null
    );
    const [selectedMediaType, setSelectedMediaType] = useState<
        string | null
    >(null);

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {media.map(
                    (
                        item: MediaLinks,
                        index: number
                    ) => {
                        // console.log(item);
                        return (
                          <div
                            key={index}
                            className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => {
                              setSelectedMedia(
                                typeof item === "string" ? item : item.url
                              );
                              setSelectedMediaType(type);
                            }}
                          >
                            {type === "video" ? (
                              <video
                                src={item.url}
                                controls
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <img
                                src={item.url}
                                alt="Post Image"
                                width={100}
                                height={100}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        );
                    }
                )}
            </div>

            <Dialog
                open={!!selectedMedia}
                onOpenChange={() => setSelectedMedia(null)}
            >
                <DialogContent className="sm:max-w-[50vw] h-[70vh] p-4 border-none bg-black/90">
                    <DialogTitle className="text-white p-0">
                        {selectedMediaType === 'video'
                            ? 'Video'
                            : 'Image'}
                    </DialogTitle>
                    <div className="flex items-center justify-center h-full w-full p-0">
                        {selectedMediaType === 'video' ? (
                            <video
                                src={selectedMedia as string}
                                controls
                                className="max-w-full max-h-[calc(70vh-0rem)] object-contain"
                            />
                        ) : (
                            <img
                                src={selectedMedia as string}
                                alt="Image"
                                className="max-w-full max-h-[calc(70vh-0rem)] object-contain rounded-lg"
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

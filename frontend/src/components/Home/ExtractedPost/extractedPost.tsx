'use client';
import { useState } from 'react';
import { ExtractedPost } from '@/types/index.js';
import { PostCard } from './PostCard';
import { CollapsibleSection } from './CollapsibleSections';
import { MediaGrid } from './PostMediaGrid';
import { DetailView } from './PostDetailView';

export function ExtractedPostView({
    post,
    handleDelete,
    // posts
    // setAllPosts,
}:
{
    post: ExtractedPost | null;
    handleDelete: (id: string) => void;
    // posts: ExtractedPost[] | null;
    // setAllPosts: React.Dispatch<
    //     React.SetStateAction<ExtractedPost[] | null>
    // >;
}) {
    const [selectedPost, setSelectedPost] =
        useState<ExtractedPost | null>(null);


    if (!post) {
        return <div>No URL Passed.</div>;
    }

    return (
        <div className="space-y-6 my-6">
            <PostCard
                key={post._id}
                post={post}
                // setSelectedPost={setSelectedPost}
                handlePostDelete={handleDelete}
            />
            <CollapsibleSection
                title="Extracted Images"
                count={post?.images?.length || 0}
            >
                {post?.images && (
                    <MediaGrid media={post.images} type="image" />
                )}
            </CollapsibleSection>

            <CollapsibleSection
                title="Extracted Videos"
                count={post?.videos?.length || 0}
            >
                {post?.videos && (
                    <MediaGrid media={post.videos} type="video" />
                )}
            </CollapsibleSection>

            {selectedPost && (
                <DetailView
                    post={selectedPost}
                    onClose={() => setSelectedPost(null)}
                />
            )}
        </div>
    );
}

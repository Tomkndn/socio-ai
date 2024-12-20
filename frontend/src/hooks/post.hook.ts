import { PostsContext } from "@/contexts/post.context";
import { useContext } from "react";

export const usePosts = () => {
    const context = useContext(PostsContext);
    if (!context) {
        throw new Error(
            'usePosts must be used within a PostsProvider'
        );
    }
    return context;
};

// contexts/PostsContext.tsx
import React, {
    createContext,
    useContext,
    useReducer,
    ReactNode,
} from 'react';
import { ExtractedPost, AmazonProductListing } from '@/types';

interface PostsState {
    posts: ExtractedPost[];
    currentPost: ExtractedPost | null;
    products: Record<string, AmazonProductListing>;
    isLoading: boolean;
    error: string | null;
}

type PostsAction =
    | { type: 'SET_POSTS'; payload: ExtractedPost[] }
    | { type: 'ADD_POST'; payload: ExtractedPost }
    | { type: 'SET_CURRENT_POST'; payload: ExtractedPost | null }
    | { type: 'DELETE_POST'; payload: string }
    | { type: 'ADD_PRODUCT'; payload: { postId: string; product: AmazonProductListing }}
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null };

const initialState: PostsState = {
    posts: [],
    currentPost: null,
    products: {},
    isLoading: false,
    error: null,
};

const postsReducer = (
    state: PostsState,
    action: PostsAction
): PostsState => {
    switch (action.type) {
        case 'SET_POSTS':
            return { ...state, posts: action.payload };
        case 'ADD_POST':
            return {
                ...state,
                posts: [action.payload, ...state.posts],
            };
        case 'SET_CURRENT_POST':
            return { ...state, currentPost: action.payload };
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(
                    (post) => post._id !== action.payload
                ),
            };
        case 'ADD_PRODUCT':
            return {
                ...state,
                products: {
                    ...state.products,
                    [action.payload.postId]: action.payload.product,
                },
            };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

const PostsContext = createContext<{
    state: PostsState;
    dispatch: React.Dispatch<PostsAction>;
} | null>(null);

export const PostsProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [state, dispatch] = useReducer(postsReducer, initialState);

    return (
        <PostsContext.Provider value={{ state, dispatch }}>
            {children}
        </PostsContext.Provider>
    );
};

export const usePosts = () => {
    const context = useContext(PostsContext);
    if (!context) {
        throw new Error(
            'usePosts must be used within a PostsProvider'
        );
    }
    return context;
};

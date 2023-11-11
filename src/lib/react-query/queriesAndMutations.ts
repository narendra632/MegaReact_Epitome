
import { INewPost, INewUser, IUpdatePost, IUpdateUser } from '@/types'


import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query';

import { QUERY_KEYS } from "@/lib/react-query/queryKeys";

import { createUserAccount, signInAccount, signOutAccount, createPost, getRecentPosts, likePost, savePost, deleteSavedPost, getCurrentUser } from '../appwrite/api'



// Initialized the New Mutation Function for creating a new user account
export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user),
    });
};


// Initialized the New Mutation Function for signing in a user account
export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user : {
            email:string; password: string;
        }) => signInAccount(user),
    });
};


// Initialized the New Mutation Function for signing out a user account
export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount,
    });
};


// Initialized the New Mutation Function for creating a new post
export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
  };
  
  
// Initialized the New Mutation Function for getting recent posts on the home page
export const useGetRecentPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getRecentPosts,
    });
}


// Initialized the New Mutation Function for liking a post
export const useLikePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({postId, likesArray }: {postId: string; likesArray: string[] }) => likePost(postId, likesArray),
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POSTS]
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CURRENT_USER]
        });
      },
    });
  }


// Initialized the New Mutation Function for saving a post
export const useSavePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({postId, userId }: {postId: string; userId: string }) => savePost(postId, userId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POSTS]
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CURRENT_USER]
        });
      },
    });
  }


// Initialized the New Mutation Function for deleting a saved a post
export const useDeleteSavedPost = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POSTS]
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CURRENT_USER]
        });
      },
    });
  }


// 
export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: getCurrentUser
    });
}
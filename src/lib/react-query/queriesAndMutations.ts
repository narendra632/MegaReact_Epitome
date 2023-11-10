
import { INewPost, INewUser, IUpdatePost, IUpdateUser } from '@/types'


import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query';

import { QUERY_KEYS } from "@/lib/react-query/queryKeys";

import { createUserAccount, signInAccount, signOutAccount, createPost } from '../appwrite/api'



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
  
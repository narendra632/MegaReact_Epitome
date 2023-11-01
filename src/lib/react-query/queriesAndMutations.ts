
import { INewUser } from '@/types'

import { createUserAccount, signInAccount } from '../appwrite/api'

import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query';

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
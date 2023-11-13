
import { INewPost, INewUser, IUpdatePost, IUpdateUser } from '@/types'


import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query';

import { QUERY_KEYS } from "@/lib/react-query/queryKeys";

import { createUserAccount, signInAccount, signOutAccount, createPost, getRecentPosts, likePost, savePost, deleteSavedPost, getCurrentUser, getPostById, updatePost, deletePost, getInfinitePosts, searchPosts, getUsers, getUserById, updateUser } from '../appwrite/api'



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


// Initialized the New Mutation Function for deleting a saved post
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


// Initialized the New Mutation Function to get the current user from the database
export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: getCurrentUser
    });
}


// Initialized the New Mutation Function to get the posts from the database
export const useGetPostById = (postId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
        queryFn: () => getPostById(postId),
        enabled: !!postId,
    });
}


// Initialized the New Mutation Function to update the posts from the database
export const useUpdatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (post: IUpdatePost) => updatePost(post),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            });
        }
    });
}


// Initialized the New Mutation Function to delete the posts from the database
export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({postId, imageId}: {postId: string, imageId: string}) => deletePost(postId, imageId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            });
        }
    });
}


// Initialized the New Mutation Function to get the posts from the database
export const useGetPosts = () => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
        queryFn: getInfinitePosts,
        getNextPageParam: (lastPage) => {
            if (lastPage && lastPage.documents.length === 0) return null;

            const lastId = lastPage?.documents[lastPage?.documents.length - 1].$id;

            return lastId;
        },
    });
}


// Initialized the New Mutation Function to search the posts from the database
export const useSearchPosts = (searchTerm: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
        queryFn: () => searchPosts(searchTerm),
        enabled: !!searchTerm,
    });
}


// Initialized the New Mutation Function to get the users from the database
export const useGetUsers = (limit?: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: () => getUsers(limit),
  });
};


// Initialized the New Mutation to get user by id from the database
export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};



// Initialized the New Mutation Function to update the user from the database
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: IUpdateUser) => updateUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
      });
    },
  });
};
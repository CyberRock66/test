import { axiosInstance } from '@/utils/api.util';
import { IPost, IPosts } from '../types/posts.model';

export const getAllPosts = async (): Promise<IPosts> => {
  const { data } = await axiosInstance.get(`/posts`, {
    params: {
      limit: 10,
    },
  });
  return data;
};

export const deletePost = async (postId: number): Promise<IPost> => {
  const { data } = await axiosInstance.delete(`/posts/${postId}`);

  return data;
};

export const addPost = async (title: string): Promise<IPost> => {
  const { data } = await axiosInstance.post(`/posts/add`, {
    title,
    userId: 66,
  });

  return data;
};

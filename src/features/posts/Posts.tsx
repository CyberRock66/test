'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { PostArticle, PostTextArea } from './components';
import { getAllPosts } from './services/posts.api';
import { IPost, IPosts } from './types/posts.model';

export const Posts = () => {
  const [fakePosts, setFakePosts] = useState<IPost[]>([]);
  const { data: postsData } = useQuery<IPosts>({
    queryKey: ['posts'],
    queryFn: () => getAllPosts(),
    cacheTime: Infinity,
  });

  useEffect(() => {
    const items =
      localStorage.getItem('fakePosts') &&
      JSON.parse(localStorage.getItem('fakePosts') ?? '');

    if (items) {
      setFakePosts(items);
    }
  }, []);

  const deleteFakePostHandler = (val: string) => {
    setFakePosts((oldValues) =>
      oldValues.filter((item) => item.uniqeId !== val),
    );
  };

  useEffect(() => {
    if (!fakePosts.length) {
      localStorage.removeItem('fakePosts');
    }
    localStorage.setItem('fakePosts', JSON.stringify(fakePosts));
  }, [fakePosts]);

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
          Discussion
        </h2>
      </div>
      <PostTextArea fakePosts={fakePosts} setFakePosts={setFakePosts} />
      {fakePosts.length > 0 &&
        fakePosts
          ?.reverse()
          .map((post: IPost) => (
            <PostArticle
              key={post.uniqeId}
              deleteFakePostHandler={deleteFakePostHandler}
              {...post}
            />
          ))}
      {postsData?.posts.map((post: IPost) => (
        <PostArticle key={post.id} {...post} />
      ))}
    </div>
  );
};

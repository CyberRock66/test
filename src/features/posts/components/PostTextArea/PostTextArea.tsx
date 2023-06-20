import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addPost } from '../../services/posts.api';
import { IPost } from '../../types/posts.model';

type Props = {
  setFakePosts: Dispatch<SetStateAction<IPost[]>>;
  fakePosts: IPost[];
};

export const PostTextArea: React.FC<Props> = ({ setFakePosts, fakePosts }) => {
  const getFakePostFromStorage = localStorage.getItem('fakePostTitle');
  const [fakePostTitle, setFakePostTitle] = useState<string>(
    getFakePostFromStorage ?? '',
  );

  const addFakePosteHanlder = async (e: React.FormEvent) => {
    e.preventDefault();
    await addPost(fakePostTitle).then((res) => {
      localStorage.removeItem('fakePostTitle');
      setFakePostTitle('');
      setFakePosts((prev: IPost[]) => [...prev, { ...res, uniqeId: uuidv4() }]);
    });
  };

  useEffect(() => {
    localStorage.setItem('fakePostTitle', fakePostTitle);
    if (fakePosts.length > 0) {
      localStorage.setItem('fakePosts', JSON.stringify(fakePosts));
    }
  }, [fakePostTitle, fakePosts]);

  return (
    <form className="mb-6" onSubmit={addFakePosteHanlder}>
      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <label htmlFor="comment" className="sr-only">
          Your comment
        </label>
        <textarea
          id="comment"
          rows={6}
          value={fakePostTitle}
          onChange={(e) => setFakePostTitle(e.target.value)}
          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
          placeholder={
            fakePostTitle.length > 0 ? fakePostTitle : 'Write a comment...'
          }
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-cyan-950 text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
      >
        Post comment
      </button>
    </form>
  );
};

import Image from 'next/image';
import Avatar from '@/assets/images/omni.jpg';
import { useToggle } from '@/hooks/useToggle';
import { useState } from 'react';
import { IPost } from '../../types/posts.model';
import { deletePost } from '../../services/posts.api';

export const PostArticle: React.FC<
  Pick<IPost, 'id' | 'title' | 'uniqeId'> & { deleteFakePostHandler?: any }
> = ({ deleteFakePostHandler, ...post }) => {
  const [fakeRemovePost, setFakeRemovePost] = useState<Boolean>(false);
  const [value, toggle] = useToggle();

  const deletePostHandler = async (postId: number) => {
    await deletePost(postId).then(() => setFakeRemovePost(true));
  };

  return (
    <article
      className={`${
        fakeRemovePost ? 'hidden' : ''
      } p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900`}
    >
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
            <Image
              src={Avatar}
              alt="avatar"
              className="mr-2 w-6 h-6 rounded-full"
              width={24}
              height={24}
            />
            Random User
          </p>
        </div>
        <div className="relative">
          <button
            onClick={toggle}
            id="dropdownComment1Button"
            data-dropdown-toggle="dropdownComment1"
            className="inline-flex relative items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
            <span className="sr-only">Comment settings</span>
          </button>

          {value && (
            <div
              id="dropdownComment1"
              className="absolute right-0 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
            >
              <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownMenuIconHorizontalButton"
              >
                <li>
                  {post.uniqeId ? (
                    <button
                      type="button"
                      onClick={() => deleteFakePostHandler(post.uniqeId)}
                      className="block w-full py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => deletePostHandler(post.id)}
                      className="block  w-full py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Remove
                    </button>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
      </footer>
      <p className="text-gray-500 dark:text-gray-400">{post.title}</p>
    </article>
  );
};

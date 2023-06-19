import { PostArticle, PostTextArea } from './components';

export const Posts = () => (
  <div className="max-w-2xl mx-auto px-4">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
        Discussion (20)
      </h2>
    </div>
    <PostTextArea />
    <PostArticle />
  </div>
);

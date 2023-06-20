import { dehydrate, Hydrate } from '@tanstack/react-query';
import { Posts } from '@/features/posts/Posts';
import { getAllPosts } from '@/features/posts/services/posts.api';
import getQueryClient from '@/utils/getQueryClient';

const Home = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['posts'], () => getAllPosts());
  const dehydratedState = dehydrate(queryClient);
  return (
    <main className="bg-white dark:bg-gray-900 py-8 lg:py-16">
      <Hydrate state={dehydratedState}>
        <Posts />
      </Hydrate>
    </main>
  );
};
export default Home;

import PostCard from "./PostCard";
import type { RecentPostsProps } from "../types/types";
import Loading from "./Loading";

export default function RecentPosts({ publishedPosts }: RecentPostsProps) {
  return (
    <section className="mx-5 md:m-0">
      <h2 className="text-xl font-poppins text-center">Recent Posts</h2>
      <ul className="mt-4 md:flex md:flex-wrap md:gap-1 md:justify-around">
        {publishedPosts.length > 0 ? (
          publishedPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <Loading />
        )}
      </ul>
    </section>
  );
}

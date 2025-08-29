import PostCard from "./PostCard";
import type { RecentPostsProps } from "../types/types";



export default function RecentPosts({ publishedPosts }: RecentPostsProps) {
  return (
    <section className="mx-5">
      <h2 className="text-xl font-poppins">Recent Posts</h2>
      <ul className="mt-4">
        {publishedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}

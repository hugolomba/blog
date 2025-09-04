import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import axios from 'axios';
import PostCard from '../components/PostCard';
import type { Post } from '../types/types';


export default function AllPosts() {
    const { user } = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
                    const fetchPosts = async () => {
                        const response = await axios.get(`${import.meta.env.VITE_API_URL_BASE}/posts/me`,
                            {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`
                                }
                            }
                        );
                        console.log(user)
                        setPosts(response.data);
                        console.log(response.data);
        };

        fetchPosts();
    }, [user?.id]);

  return (
    <div className='p-4'>
     
      <h1 className="text-3xl text-center font-bold mb-8">All your posts</h1>
      <ul className="mt-4">
        {posts && posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}

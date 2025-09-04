import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import axios from 'axios';
import PostCard from '../components/PostCard';
import { useNavigate } from 'react-router-dom';
import type { Post } from '../types/types';


export default function AllPosts() {
    const { user } = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();
  

    // Fetch posts from the API or context
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
    <button onClick={() => navigate(-1)} className="text-lg font-bold ml-2 cursor-pointer">← Back</button>

      <h1 className="text-2xl font-bold">All Your Posts</h1>
      <p className="mt-2">Here you can view all your posts.</p>
      <ul className="mt-4">
        {posts && posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}

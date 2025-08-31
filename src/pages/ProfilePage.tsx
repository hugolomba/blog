import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";
import type { User } from "../types/types";
import { Link } from "react-router-dom";
import { FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [selectedSection, setSelectedSection] = useState("articles")

    const handleSelectSection = (section) => {
        setSelectedSection(section)
    }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL_BASE}/users/${id}`);
        const data = await res.json();
        setUserProfile(data);
        console.log("Fetched user profile:", data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
    fetchPosts();
  }, [id]);

  return (
    <div className="p-4">  
        <Link to="/" className="text-lg font-bold ml-2 cursor-pointer">← Back</Link>
        {userProfile ? <ProfileHeader userProfile={userProfile} /> : <p>Loading...</p>}
        
        <div className="mt-14 flex flex-row justify-evenly text-lg">
            <button onClick={() => handleSelectSection("articles")} className={`${selectedSection === "articles" && "font-bold border-b  "}`}>Articles</button>
            <button onClick={() => handleSelectSection("comments")} className={`${selectedSection === "comments" && "font-bold border-b  "}`}>Comments</button>
            <button onClick={() => handleSelectSection("savedPosts")} className={`${selectedSection === "savedPosts" && "font-bold border-b  "}`}>Saved Posts</button>
        </div>

        {userProfile ? <ProfileArticles userProfile={userProfile} /> : <p>Loading...</p>}



    
    </div>
  );
}

function ProfileHeader( {userProfile}: { userProfile: User }) {
    return(
    <>
    <div className="flex flex-col items-center gap-2 mt-6">
        <img className="w-22 h-22 rounded-full object-cover" src={userProfile.avatarImage} alt="User Profile Picture" />
        <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold leading-tight">{userProfile.name} Lomba</h3>
            <h4 className="text-sm text-gray-500 leading-tight">@{userProfile.username}</h4>
        </div>
        
        <p className="">{userProfile.bio}</p>
    </div>
    <div className="">


    </div>

    </>
)}

function ProfileArticles({ userProfile }: { userProfile: User }) {
    return (
        <div className="mt-4 flex flex-col gap-4">
            <h3 className="text-md font-bold">{userProfile.posts.length} Articles</h3>
            {userProfile.posts.map((post) => (
               <ProfilePostCard key={post.id} post={post} />
            ))}
        </div>
    );
}

function ProfilePostCard({post}) {
    return (
        <Link to={``}>
        <div className="flex justify-between gap-4 h-25">
        <img className="w-1/4 h-auto object-cover rounded-2xl" src={post.coverImage} alt="Post Cover Image" />
        <div className="p-2 flex flex-col justify-between w-3/4">
            <h5 className="text-xl font-bold line-clamp-3">{post.title}</h5>
            <div className="flex flex-row items-center justify-between gap-4">
                <span className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</span>
                <div className="flex flex-row gap-2">
                    <span className="flex flex-row items-center gap-1">{post.likes.length} <FaRegHeart /></span>
                    <span className="flex flex-row items-center gap-1">{post.comments.length} <FaRegComment /></span>
                    <span className="flex flex-row items-center gap-1">{post.savedBy.length} <FaRegBookmark /></span>
                </div>
                
            </div>
            

        </div>
        </div>
        </Link>
    )
}
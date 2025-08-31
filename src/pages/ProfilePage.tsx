import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Post, User } from "../types/types";
import { Link } from "react-router-dom";
import { FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [selectedSection, setSelectedSection] = useState("articles")
  

    const handleSelectSection = (section) => {
        setSelectedSection(section)
    }

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL_BASE}/users/${id}`);
        const data = await res.json();
        setUserProfile(data);
        console.log("Fetched user profile:", data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
    fetchUserProfile();
  }, [id]);

  return (
    <div className="p-4">  
        <button onClick={() => navigate(-1)} className="text-lg font-bold ml-2 cursor-pointer">← Back</button>
        {userProfile ? <ProfileHeader userProfile={userProfile} /> : <p>Loading...</p>}
        
        <div className="mt-14 flex flex-row justify-evenly text-lg">
            <button onClick={() => handleSelectSection("articles")} className={`${selectedSection === "articles" && "font-bold border-b"} cursor-pointer`}>Articles</button>
            <button onClick={() => handleSelectSection("comments")} className={`${selectedSection === "comments" && "font-bold border-b"} cursor-pointer`}>Comments</button>
            <button onClick={() => handleSelectSection("savedPosts")} className={`${selectedSection === "savedPosts" && "font-bold border-b"} cursor-pointer`}>Saved Posts</button>
        </div>

        {userProfile && selectedSection === "articles" && <ProfileArticles userProfile={userProfile} />}
        {userProfile && selectedSection === "comments" && <ProfileComments userProfile={userProfile} />}
        {userProfile && selectedSection === "savedPosts" && <ProfileSavedPosts userProfile={userProfile} />}
    </div>
  );
}

function ProfileHeader( {userProfile}: { userProfile: User }) {
  const { user } = useAuth();
    return(
    <>
    <div className="flex flex-col items-center gap-2 mt-6">
        <img className="w-22 h-22 rounded-full object-cover" src={userProfile.avatarImage} alt="User Profile Picture" />
        {userProfile.id === user.id && <button className="text-xs text-gray-500 bg-blue-200 px-2 py-1 rounded-2xl">Edit Profile</button>}
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
        <Link to={`/post/${post.id}`}>
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

function ProfileComments({ userProfile }: { userProfile: User }) {
    return (
        <div className="mt-4 flex flex-col gap-4">
            <h3 className="text-md font-bold">{userProfile.comments.length} Comments</h3>
            {userProfile.comments.map((comment) => (
                <ProfileCommentCard key={comment.id} comment={comment} />
            ))}
        </div>
    );
}

function ProfileCommentCard({ comment }) {
  console.log("Rendering ProfileCommentCard for comment:", comment);

    return (
      <Link to={`/post/${comment.postId}`}>
        <div className="">
          <span className="text-sm font-semibold">On post: {comment.post.title}</span>
        </div>
        <div className="border-b border-gray-200 py-2">
            <p className="text-sm">{comment.content}</p>
            <span className="text-xs text-gray-500">On {new Date(comment.createdAt).toLocaleDateString()}</span>
            {/* <span className="text-xs text-gray-500">By {comment.author.username}</span> */}
        </div>
      </Link>
    );
}

function ProfileSavedPosts({ userProfile }: { userProfile: User }) {
    return (
      
    
        <div className="mt-4 flex flex-col gap-4">
            <h3 className="text-md font-bold">{userProfile.savedPosts.length} Saved Posts</h3>

            {userProfile && userProfile.savedPosts.map((post) => (
                <ProfileSavedPostCard key={post.id} post={post} />
            ))}
        </div>
  
    );
}

function ProfileSavedPostCard({ post }: { post: Post }) {

  console.log("Rendering ProfileSavedPostCard for post:", post);

    return (
        <Link to={`/post/${post.post.id}`}>
            <div className="flex justify-between gap-4 h-25">
                <img className="w-1/4 h-auto object-cover rounded-2xl" src={post.post.coverImage} alt="Post Cover Image" />
                <div className="p-2 flex flex-col justify-between w-3/4">
                    <h5 className="text-xl font-bold line-clamp-3">{post.post.title}</h5>
                    <div className="flex flex-row items-center justify-between gap-4">
                        <span className="text-sm text-gray-500">{new Date(post.post.createdAt).toLocaleDateString()}</span>
                        <div className="flex flex-row gap-2">
                            <span className="flex flex-row items-center gap-1">{post.post.likes.length} <FaRegHeart /></span>
                            <span className="flex flex-row items-center gap-1">{post.post.comments.length} <FaRegComment /></span>
                            {/* <span className="flex flex-row items-center gap-1">{post.post.savedBy.length} <FaRegBookmark /></span> */}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

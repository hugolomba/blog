export type User = {
    avatarImage: string;
    bio: string;
    comments: any[];
    email: string;
    followers: any[];
    following: any[];
    id: number;
    likes: any[];
    name: string;
    posts: any[];
    username: string;
    token: string;
}

export type Post = {
  id: number;
  author: User;
  authorId: number;
  title: string;
  content: string;
  coverImage: string;
  published: boolean;
  createdAt: string; 
  updatedAt: string; 
  savedBy: User[];
  likes: User[];
  
};

export type RecentPostsProps = {
  publishedPosts: Post[];
}
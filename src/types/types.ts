export type User = {
    avatarImage: string;
    bio: string;
    comments: any[];
    email: string;
    followers: any[];
    following: any[];
    id: number;
    savedPosts: SavedPost[];
    likes: any[];
    name: string;
    posts: any[];
    username: string;
    token: string;
    surname: string;
}

export type SavedPost = {
  id: number;
  postId: number;
  userId: number;
  createdAt: string;
  post: Post;
};

export type Comment = {
  id: number;
  content: string;
  authorId: number;
  postId: number;
  post?: Post;
  createdAt: string;
  author: User;
  likes: User[];
};


export type Post = {
  id: number;
  author: User;
  authorId: number;
  title: string;
  content: string;
  comments: Comment[];
  coverImage: string;
  published: boolean;
  createdAt: string; 
  updatedAt: string; 
  savedBy: {
    id: number;
    userId: number;
    postId: number;
    commentId: number;
    createdAt: string;
  }[];
  likes: {
    id: number;
    userId: number;
    postId: number;
    commentId: number;
    createdAt: string;
  }[];
};

export type RecentPostsProps = {
  publishedPosts: Post[];
}


export type SearchResultsProps = {
  searchResults: Post[];
}

export type AuthContextType = {
  user: User | null;
  register: (name: string, surname: string, username: string, email: string, password: string, bio: string, avatarImage: File) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  editUser: (id: number, name: string, surname: string, username: string, email: string, bio: string, avatarImage: File | null) => Promise<void>;
  loading: boolean;
  id: number | undefined;
}
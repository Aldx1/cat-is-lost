import { createContext, useContext, ReactNode, useState } from "react";
import { IPost } from "../models/Post";
import { HTTPMethod, useFetch } from "../hooks/useFetch";

interface IPostsContext {
  posts: IPost[];
  getPosts: () => void;
}

const PostsContext = createContext<IPostsContext>({
  posts: [],
  getPosts: () => {},
});

interface IPostsProviderProps {
  children: ReactNode;
}

// Post context to hold and fetch posts.
export const PostsProvider = ({ children }: IPostsProviderProps) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [invoke, setInvoke] = useState(false);

  const getPostSuccess = (data?: IPost[]) => {
    if (data) setPosts(data);
  };

  const {} = useFetch<IPost[]>(
    invoke,
    setInvoke,
    "posts",
    {},
    false,
    getPostSuccess,
    HTTPMethod.GET
  );

  const getPosts = () => {
    setInvoke(true);
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        getPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = (): IPostsContext => {
  const context = useContext(PostsContext);
  return context;
};

import { IPost } from "../models/Post";

const SASToken = process.env.SAS_TOKEN;
const BaseURL = process.env.IMAGE_BASE_URL;

// Display for viewing existing posts
const PostView = (post: IPost) => {
  return (
    <>
      <p>{post.description}</p>
      {post.pictures?.length > 0 &&
        post.pictures?.split(",").map((imagePath, index) => (
          <div key={index} className="mt-2">
            <img
              style={{ height: "100%", width: "100%" }}
              src={`${BaseURL}${imagePath}${SASToken}`}
              alt={`Photo ${index + 1}`}
              onError={(e) => {
                e.currentTarget.src = `${BaseURL}${imagePath}${SASToken}&retry=${Date.now()}`;
              }}
            />
          </div>
        ))}
    </>
  );
};

export default PostView;

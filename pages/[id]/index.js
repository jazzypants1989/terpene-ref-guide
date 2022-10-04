import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import Post from "../../models/Post";

/* Allows you to view post card info and delete post card*/
const PostPage = ({ post }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const handleDelete = async () => {
    const postID = router.query.id;

    try {
      await fetch(`/api/posts/${postID}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      setMessage("Failed to delete the post.");
    }
  };

  return (
    <div key={post._id}>
      <div className="card">
        <img src={post.image_url} />
        <h5 className="post-name">{post.name}</h5>
        <div className="main-content">
          <p className="post-name">{post.name}</p>
          <p className="owner">Owner: {post.owner_name}</p>

          {/* Extra Post Info: Likes and Dislikes */}
          <div className="likes info">
            <p className="label">Likes</p>
            <ul>
              {post.likes.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>
          <div className="dislikes info">
            <p className="label">Dislikes</p>
            <ul>
              {post.dislikes.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>

          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${post._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const post = await Post.findById(params.id).lean();
  post._id = post._id.toString();

  return { props: { post } };
}

export default PostPage;

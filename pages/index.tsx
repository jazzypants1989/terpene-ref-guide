import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Post from "../models/Post";
import Layout from "../components/layout";

const Index = ({ posts }) => (
  <>
    <Layout>
      {/* Create a card for each post */}
      {posts.map((post) => (
        <div key={post._id}>
          <div className="card">
            <img src={post.image_url} />
            <h5 className="post-name">{post.name}</h5>
            <div className="main-content">
              <p className="post-name">{post.name}</p>
              <p className="post-summary">{post.summary}</p>
              <div className="btn-container">
                <Link href="/[id]/edit" as={`/${post._id}/edit`}>
                  <button className="btn edit">Edit</button>
                </Link>
                <Link href="/[id]" as={`/${post._id}`}>
                  <button className="btn view">View</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Layout>
  </>
);

/* Retrieves post(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await Post.find({});
  const posts = result.map((doc) => {
    const post = doc.toObject();
    post._id = post._id.toString();
    return post;
  });

  return { props: { posts: posts } };
}

export default Index;

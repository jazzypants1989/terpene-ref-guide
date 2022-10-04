import Link from "next/link";
import articleStyles from "./article.module.css";
import Meta from "../../../components/Meta";

const articles = ({ post }) => {
  return (
    <div>
      <Meta title={post.title} description={post.body} keywords={post.body} />
      Check out this hot news:
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <Link href="/">
        <a className={articleStyles.btn}>Go Back</a>
      </Link>
    </div>
  );
};

export const getStaticProps = async (context) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
  );
  const post = await res.json();

  return {
    props: {
      post,
    },
    revalidate: 5,
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const posts = await res.json();

  const ids = posts.map((post) => post.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

export default articles;

// export const getStaticProps = async (context) => {
//   const res = await fetch(
//     `{server}/api/articles/${context.params.id}`
//   );
//   const post = await res.json();

//   return {
//     props: {
//       post,
//     },
//   };
// };

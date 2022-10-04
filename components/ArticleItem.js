import articleStyles from "./article.module.css";
import Link from "next/link";

const ArticleItem = () => {
  return <div>ArticleItem</div>;
};
// const ArticleItem = ({ post }) => {
//   return (
//     <Link href="/article/[id]" as={`/article/${post.id}`}>
//       <a className={articleStyles.card}>
//         <h3>{post.name} &rarr;</h3>
//         <p>{post.body}</p>
//       </a>
//     </Link>
//   );
// };
export default ArticleItem;

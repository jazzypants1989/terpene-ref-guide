import Layout from "../components/layout";
import Form from "../components/form";

export default function AddArticle() {
  const postForm = {
    name: "",
    owner_name: "",
    species: "",
    age: 0,
    poddy_trained: false,
    diet: [],
    image_url: "",
    likes: [],
    dislikes: [],
  };
  return (
    <Layout>
      <Form formId="add-post-form" postForm={postForm} />
    </Layout>
  );
}

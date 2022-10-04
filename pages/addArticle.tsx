import Layout from "../components/layout";
import Form from "../components/form";

export default function AddArticle() {
  const postForm = {
    name: "",
    type: "",
    researchUrl: "",
    description: "",
  };
  return (
    <Layout>
      <Form formId="add-post-form" postForm={postForm} />
    </Layout>
  );
}

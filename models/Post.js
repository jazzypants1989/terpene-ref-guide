import mongoose from "mongoose";

/* PostSchema will correspond to a collection in your MongoDB database. */
const PostSchema = new mongoose.Schema({
  name: {
    /* The name of this post */

    type: String,
    required: [true, "Please provide a name for this post."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  type: {
    /* The type of the post */

    type: String,
    required: [true, "Please specify the type of your post."],
    maxlength: [40, "Type specified cannot be more than 40 characters"],
  },
  research_url: {
    /* Url to post image */

    required: [true, "Please provide a url to the research for this post."],
    type: String,
  },
  summary: {
    /* The summary of this post */

    type: String,
    required: [true, "Please provide a summary for this post."],
    maxlength: [200, "Summary cannot be more than 200 characters"],
  },
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);

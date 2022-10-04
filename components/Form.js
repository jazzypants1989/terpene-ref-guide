import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

const Form = ({ formId, postForm, forNewPost = true }) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: postForm.name,
    type: postForm.type,
    research_url: postForm.research_url,
    summary: postForm.summary,
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/posts/${id}`, data, false); // Update the local data without a revalidation
      router.push("/");
    } catch (error) {
      setMessage("Failed to update post");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push("/");
    } catch (error) {
      setMessage("Failed to add post");
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value =
      target.name === "poddy_trained" ? target.checked : target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  /* Makes sure post info is filled for post name, owner name, type, and research url*/
  const formValidate = () => {
    let err = {};
    if (!form.name) err.name = "Name is required";
    if (!form.owner_name) err.owner_name = "Owner is required";
    if (!form.type) err.type = "Type is required";
    if (!form.research_url) err.research_url = "Research URL is required";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      forNewPost ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-green-600/40 ring-2 ring-green-600 lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-green-700 underline uppercase">
            Add an article!
          </h1>
          <form id={formId} onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              maxLength="20"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="
                      w-full
        block px-16 py-2 mt-2
        border-green-300
        rounded-md
        shadow-sm
        focus:border-green-300
        focus:ring
        focus:ring-green-200
        focus:ring-opacity-50
      "
              placeholder="Myrcene"
            />
            <label htmlFor="type">Article Type</label>
            <input
              type="text"
              maxLength="30"
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="
              w-full
block px-16 py-2 mt-2
border-green-300
rounded-md
shadow-sm
focus:border-green-300
focus:ring
focus:ring-green-200
focus:ring-opacity-50
"
            />
            <label htmlFor="research_url">Research URL</label>
            <input
              type="url"
              name="research_url"
              value={form.research_url}
              onChange={handleChange}
              required
              className="
              w-full
block px-16 py-2 mt-2
border-green-300
rounded-md
shadow-sm
focus:border-green-300
focus:ring
focus:ring-green-200
focus:ring-opacity-50
"
            />
            <label htmlFor="summary">Summary</label>
            <textarea
              name="summary"
              maxLength="60"
              value={form.summary}
              onChange={handleChange}
              className="
              w-full
block px-16 py-2 mt-2
border-green-300
rounded-md
shadow-sm
focus:border-green-300
focus:ring
focus:ring-green-200
focus:ring-opacity-50
"
            />

            <button
              type="submit"
              className="
                    h-10
                    px-5
                    text-green-100
                    bg-green-700
                    rounded-lg
                    transition-colors
                    duration-150
                    focus:shadow-outline
                    hover:bg-green-800
            "
            >
              Submit
            </button>
          </form>
          <p>{message}</p>
          <div>
            {Object.keys(errors).map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
//
//         <label htmlFor="name">
//           <span className="text-gray-700">Article Name</span>
//         </label>
//         <input
//           articletype="text"
//           maxLength="20"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           required
//           className="

//         />
//       </div>
//       <div className="mb-2">
//         <label>
//           <span className="text-gray-700">Email address</span>
//           <input
//             name="email"
//             articletype="email"
//             className="
//         block
//         w-full
//         mt-2 px-16 py-2
//         border-gray-300
//         rounded-md
//         shadow-sm
//         focus:border-green-300
//         focus:ring
//         focus:ring-green-200
//         focus:ring-opacity-50
//       "
//             placeholder="john.cooks@example.com"
//             required
//           />
//         </label>
//       </div>
//       <div className="mb-2">
//         <label>
//           <span className="text-gray-700">Message</span>
//           <textarea
//             name="message"
//             className="
//         block
//         w-full
//         mt-2 px-16 py-8
//         border-gray-300
//         rounded-md
//         shadow-sm
//         focus:border-green-300
//         focus:ring
//         focus:ring-green-200
//         focus:ring-opacity-50
//       "
//             rows="5"
//           ></textarea>
//         </label>
//       </div>

//       <div className="mb-6">
//         <button
//           articletype="submit"
//           className="
//
//       "
//         >
//           Contact Us
//         </button>
//       </div>
//       <div></div>
//     </form>
//   </div>
// </div>
//   );
// };
// export default Form;

// const newFormHandler = async (event) => {
//   event.preventDefault();

//   const title = document.querySelector("#blog-title").value.trim();
//   const blog_text = document.querySelector("#blog-content").value.trim();
//   console.log("create blog content----->", blog_text);
//   console.log("create blog title----->", title);
//   // add post
//   if (title && blog_text) {
//     const response = await fetch(`/api/blogs`, {
//       method: "POST",
//       body: JSON.stringify({ title, blog_text }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.ok) {
//       document.location.replace("/dashboard");
//     } else {
//       alert("Failed to create blog");
//     }
//   }
// };
// delete post
const delButtonHandler = async (event) => {
  console.log("delete button work?");
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    console.log("id-------------->", id);

    const response = await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete blog");
    }
  }
};
// update post
const updateHandler = async (event) => {
  event.preventDefault();
  const blog_text = document.querySelector("#blog-text").value.trim();
  if (blog_text) {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        // title,
        blog_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to update");
    }
  }
};
// add comment
const newCommentHandler = async (event) => {
  event.preventDefault();

  const comment_text = document.querySelector("#comment-text").value.trim();
  // ---------------get blog_id-----------------------------
  const blog_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  console.log("add comment----->", comment_text);
  console.log("blog id----->", blog_id);

  if (comment_text) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ comment_text, blog_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to create comment");
    }
  }
};

document
  .querySelector(".delete-btn")
  .addEventListener("click", delButtonHandler);

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", newCommentHandler);

document.querySelector(".update-btn").addEventListener("click", updateHandler);

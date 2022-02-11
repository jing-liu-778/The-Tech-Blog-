const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#blog-title").value.trim();
  const blog_text = document.querySelector("#blog-content").value.trim();
  console.log("create blog content----->", blog_text);
  console.log("create blog title----->", title);
  // add post
  if (title && blog_text) {
    const response = await fetch(`/api/blogs`, {
      method: "POST",
      body: JSON.stringify({ title, blog_text }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create blog");
    }
  }
};
// delete post
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

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

document
  .querySelector(".new-project-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".project-list")
  .addEventListener("click", delButtonHandler);
// add comment
const newCommentHandler = async (event) => {
  event.preventDefault();

  const comment_text = document.querySelector("#comment-text").value.trim();

  if (comment_text) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ comment_text }),
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
  .querySelector(".new-comment-form")
  .addEventListener("submit", newCommentHandler);

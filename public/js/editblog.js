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

document
  .querySelector(".delete-btn")
  .addEventListener("click", delButtonHandler);

document.querySelector(".update-btn").addEventListener("click", updateHandler);

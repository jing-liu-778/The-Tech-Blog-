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
    console.log("create a blog----->", response);

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create blog");
    }
  }
};

document
  .querySelector(".new-project-form")
  .addEventListener("submit", newFormHandler);

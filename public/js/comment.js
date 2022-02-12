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
  .querySelector(".new-comment-form")
  .addEventListener("submit", newCommentHandler);

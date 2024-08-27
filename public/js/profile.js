const jwt_decode = window.jwt_decode;

function decodeToken(token) {
  try {
    return jwt_decode(token);
  } catch (err) {
    console.error("Error decoding token:", err.message);
    return null;
  }
}

let userId;

document.addEventListener("DOMContentLoaded", () => {
  const postList = document.querySelector(".posts-list");

  const token = localStorage.getItem("jwt");
  if (!token) {
    console.error("No token found. Redirecting to login page.");
    window.location.href = "/auth/sign-in";
    return;
  }

  const decodedToken = decodeToken(token);

  if (!decodedToken) {
    console.error("Failed to decode token.");
  } else {
    userId = decodedToken.id;
    if (userId) {
      getPosts(userId, postList);
    } else {
      console.error("User not found in decoded token.");
    }
  }
});

async function getPosts(userId, postList) {
  if (!postList) {
    console.error("Post list element not found.");
    return;
  }

  try {
    const resAllPosts = await fetch(`/profile/${userId}/posts`);

    if (resAllPosts.ok) {
      const data = await resAllPosts.json();
      postList.innerHTML = "";

      data.posts.forEach((post) => {
        const li = document.createElement("li");

        const titleAndText = document.createElement("p");
        titleAndText.innerHTML = `<strong>${post.title}</strong><br>${post.text}`;
        li.appendChild(titleAndText);

        if (post.imgUrl) {
          const img = document.createElement("img");
          img.src = `/${post.imgUrl}`;

          const div = document.createElement("div");
          div.classList.add("image-container");
          div.appendChild(img);
          li.appendChild(div);
        }

        li.dataset.id = post._id;
        postList.appendChild(li);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = `Delete`;
        deleteBtn.classList.add("delete-button");
        li.appendChild(deleteBtn);

        deleteBtn.addEventListener("click", async () => {
          await deletePost(userId, li.dataset.id);
        });
      });
    } else {
      const errorData = await resAllPosts.json();
      console.error(
        `Error fetching posts: ${resAllPosts.status} - ${errorData.error}`
      );
    }
  } catch (err) {
    console.error("Error fetching posts:", err.message);
  }
}

async function deletePost(userId, postId) {
  try {
    const response = await fetch(`/profile/delete/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    if (response.ok) {
      const postElement = document.querySelector(`[data-id='${postId}']`);
      if (postElement) {
        postElement.remove();
      }
    } else {
      const errorData = await response.json();
      throw new Error(
        `Error deleting post: ${response.status} - ${errorData.error}`
      );
    }
  } catch (err) {
    console.error(err.message);
  }
}

const jwt_decode = window.jwt_decode;

function decodeToken(token) {
  try {
    return jwt_decode(token);
  } catch (err) {
    console.log(err);
    return null;
  }
}
const addBtn = document.querySelector(".add-posts-button");
const postList = document.querySelector(".posts-list");

const token = localStorage.getItem("jwt");
const decodedToken = decodeToken(token);

async function getPosts(userId) {
  const resAllPosts = await fetch(`/profile/${userId}/allUserPosts`);

  if (resAllPosts.ok) {
    const data = await resAllPosts.json();
    postList.innerHTML = "";
    data.posts.forEach((post) => {
      const li = document.createElement("li");
      const titleAndText = document.createElement("p");
      titleAndText.innerHTML = `<strong>${post.title}</strong><br>${post.text}`;
      li.appendChild(titleAndText);
      li.dataset.id = post._id;
      postList.appendChild(li);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = `Delete`;
      deleteBtn.classList.add("delete-button");
      li.appendChild(deleteBtn);

      deleteBtn.addEventListener("click", async () => {
        const id = li.dataset.id;

        try {
          const response = await fetch(
            `/profile/${userId}/deleteUserPost/${id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            postList.removeChild(li);
          }
        } catch (err) {
          console.log(err);
        }
      });
    });
  } else {
    const errorData = await resAllPosts.json();
    console.error(
      `Error fetching posts: ${resAllPosts.status} - ${errorData.error}`
    );
  }
}

if (!decodedToken) {
  console.error("Failed to decode token.");
} else {
  const userId = decodedToken.id;
  if (userId) {
    getPosts(userId);
  } else {
    console.error("User not found in decoded token.");
  }
}

async function postPost(userId, userTitle, userText) {
  try {
    const response = await fetch(`/profile/${userId}/userPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: userTitle,
        text: userText,
      }),
    }).catch((err) => console.log(err));

    if (response.ok) {
      getPosts(userId);
    }
  } catch (err) {
    console.log({ message: "Хуйня пєрєдєлевай" }, err);
  }
}

addBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  /*
    if(!decodedToken){
        console.log('Falied to decod');
    }else{
        const userId = decodedToken.id
        postPost(userId)
    }*/

  const userTitle = document.querySelector(".title").value.trim();
  const userText = document.querySelector(".text").value.trim();

  if (!userTitle || !userText) {
    console.error("Title and text are required.");
    return;
  }

  try {
    const userId = decodedToken.id;
    await postPost(userId, userTitle, userText);
  } catch (err) {
    console.log(err);
  }
});

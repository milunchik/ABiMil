const addBtn = document.querySelector('.add-posts-button');
const postList = document.querySelector('.posts-list');

<<<<<<< Updated upstream
const getPosts = async(req, res)=>{
    const resAllPosts = await fetch('/profile/allposts');
            const data = await resAllPosts.json();
            
            if (resAllPosts.ok) {
                
                postList.innerHTML = '';
                data.posts.forEach(post => {
                    const li = document.createElement('li')
                    const titleAndText = document.createElement('p')
                    titleAndText.innerHTML = `<strong>${post.title}</strong><br>${post.text}`
                    li.appendChild(titleAndText)
                    li.dataset.id = post._id
                    postList.appendChild(li)
=======
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
const addPostBtn = document.querySelector(".new-post");
>>>>>>> Stashed changes

                    const deleteBtn = document.createElement('button')
                    deleteBtn.textContent = `Delete`
                    deleteBtn.classList.add('delete-button')
                    li.appendChild(deleteBtn)

                    deleteBtn.addEventListener('click', async()=>{
                        const id = li.dataset.id
                    
                        try{
                            const response = await fetch(`/profile/deletepost/${id}`, {
                                method: 'DELETE'
                            })
                    
                            if(response.ok){
                                postList.removeChild(li)
                            }
                        }catch(err){
                            console.log(err)
                        }
                    })
                })
            } else {
                const errorData = await resAllPosts.json();
                console.error(`Error fetching posts: ${resAllPosts.status} - ${errorData.error}`)
            }
}

getPosts()

<<<<<<< Updated upstream
const postPost = async(req, res)=>{
    const userTitle = document.querySelector('.title').value.trim();
    const userText = document.querySelector('.text').value.trim();

    if (!userTitle || !userText) {
        console.error('Title and text are required.');
        return;
=======
async function postPost(userId, userTitle, userText) {
  console.log("Posting data:", { userId, userTitle, userText });
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
    } else {
      const errorData = await response.json();
      console.log("Post failed with status:", response.status);
      console.log("Error data:", errorData);
>>>>>>> Stashed changes
    }

    try {
        const response = await fetch('/profile/post', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: userTitle,
                text: userText
            })
        })

}catch(err){
    console.log(err)
}
}

<<<<<<< Updated upstream
addBtn.addEventListener('click', async(event)=>{
    event.preventDefault()
=======
// addPostBtn.addEventListener("click", (req, res, next) => {
//   res.redirect("/profile/add-post");
// });

addBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  /*
    if(!decodedToken){
        console.log('Falied to decod');
    }else{
        const userId = decodedToken.id
        postPost(userId)
    }*/
>>>>>>> Stashed changes

    const userTitle = document.querySelector('.title').value.trim();
    const userText = document.querySelector('.text').value.trim();

    if (!userTitle || !userText) {
        console.error('Title and text are required.');
        return;
    }

    try {
        const response = await fetch('/profile/post', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: userTitle,
                text: userText
            })
        })

        if(response.ok){
            getPosts()
        }
    }catch(err){
        console.log(err)
    }
})
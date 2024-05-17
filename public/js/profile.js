const addBtn = document.querySelector('.add-posts-button');
const postList = document.querySelector('.posts-list');

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

const postPost = async(req, res)=>{
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

}catch(err){
    console.log(err)
}
}

addBtn.addEventListener('click', async(event)=>{
    event.preventDefault()

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
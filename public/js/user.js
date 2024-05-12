const list = document.querySelector('.list')

const getUsers = async()=>{
    const res = await fetch('/auth/users')
    const data = await res.json()
    data.user.map(mappedUser =>{
            if(mappedUser.username !== 'admin'){
                const li = document.createElement('li')
                li.textContent = `Username: ${mappedUser.username}\nRole: ${mappedUser.role}`
                li.dataset.id = todo._id
                list.appendChild(li)

            }else{
                return null
            }
        }
    )
}

getUsers()
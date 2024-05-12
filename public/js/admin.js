const list = document.querySelector('.list')

const getUsers = async(req, res)=>{
    const res = await fetch('/auth/users')
    const data = await res.json()
    data.user.map(mappedUser =>{
        if(mappedUser!= 'admin'){
        const li = document.createElement('li')
                li.textContent = `Username: ${mappedUser.username}\nRole: ${mappedUser.role}`
                li.dataset.id = todo._id
                list.appendChild(li)
        }else{
            return null
        }
        const editRole = document.querySelectorAll(".edit")
        const deleteUser = document.querySelector(".delete")
        editRole.forEach((button, i) => {
            button.addEventListener('click', async() => {
              display.textContent= ''
              const id = data.user[i+1].id
              const res = await fetch('/auth/update', {
              method: 'PUT',
              body: JSON.stringify({ role: 'admin', id}),
              headers: { 'Content-Type': 'application/json' }
              })
              const dataUpdate = await res.json()
              if (res.status === 400 || res.status === 401) {
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                return display.textContent = `${dataUpdate.message}. ${dataUpdate.error ? dataUpdate.error : ''}`
              }
              location.assign('/admin')
              })
            })

            deleteUser.forEach((button, i)=> {
                button.addEventListener('click', async ()=> {
                display.textContent =''
                const id = data.user[i+1].id
                const res = await fetch('/api/auth/deleteUser', {
                  method: 'DELETE',
                  body: JSON.stringify({id}),
                  headers: {'Content-Type': 'application/json'}
                  })
                const dataDelete = await res.json()
                if (res.status === 401){
                  document.body.scrollTop = 0
                  document.documentElement.scrollTop = 0
                  return display.textContent = `${dataUpdate.message}. ${dataUpdate.error ? dataUpdate.error : ''}`
                }
                location.assign('/admin')
                 })
               })
    })
}


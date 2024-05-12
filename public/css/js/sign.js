signbtn = document.querySelector('.sign-button')
form = document.querySelector('form')

signbtn.addEventListener('click', async()=>{
   
        const formData = new FormData(form)

        await fetch('/auth/sign-up', {
        method: 'POST',
        body: formData
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data)
        })
        .catch(error =>{
            console.log(error)
        }) 
})

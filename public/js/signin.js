function decodeToken(token) {
    return jwt_decode(token)
}

const signBtn = document.querySelector('.sign-button')

signBtn.addEventListener('click', async(event)=>{
    event.preventDefault()
    
    const userName = document.querySelector('.username').value;
    const userPassword = document.querySelector('.password').value;

    if (!userName || !userPassword) {
        alert('Please fill in all fields');
        return
    }

    try {
        const response = await fetch('/auth/sign-in', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userName,
                password: userPassword
            })
        });

        const data = await response.json()

        if (response.ok) {
            const decodedToken = decodeToken(data.token)
            localStorage.setItem('jwt', data.token);
            decodedToken.roles[0] === "admin" ? location.assign('/admin') : location.assign(`/profile/${userName}`)
        } else {
            alert(data.message || 'Error signing in')
        }
    } catch (error) {
        console.log(error)
    }
})

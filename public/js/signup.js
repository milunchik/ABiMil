const signBtn = document.querySelector(".sign-button");

signBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  const userName = document.querySelector(".username").value;
  const userPassword = document.querySelector(".password").value;

  await fetch("/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userName,
      password: userPassword,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.cookie = `jwt=${data.token}; path=/`;
      localStorage.setItem("jwt", data.token);
      data.role === "admin"
        ? location.assign("/admin")
        : location.assign("/sign-in");
    })
    .catch((error) => {
      console.log(error);
    });
});

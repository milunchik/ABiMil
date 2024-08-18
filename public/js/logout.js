document
  .getElementById("logoutLink")
  .addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("jwt");
    window.location.href = "/logout";
  });

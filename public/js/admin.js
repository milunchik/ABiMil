const list = document.querySelector(".list");

const getAdminUsers = async (req, res) => {
  const token = localStorage.getItem("jwt");
  try {
    const response = await fetch("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();

      if (data) {
        data.forEach((mappedUser) => {
          const li = document.createElement("li");
          li.textContent = `Username: ${mappedUser.username} Role: ${mappedUser.roles[0]}`;
          li.dataset._id = mappedUser._id;
          list.appendChild(li);

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.classList.add("delete-button");
          li.appendChild(deleteButton);
          deleteButton.addEventListener("click", async () => {
            const id = li.dataset._id;

            try {
              const response = await fetch(`/user/delete/${id}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              if (response.ok) {
                console.log("User deleted");
                list.removeChild(li);
              }
            } catch (err) {
              console.log(err);
            }
          });

          const updateButton = document.createElement("button");
          updateButton.textContent = "Update";
          updateButton.classList.add("update-button");
          li.appendChild(updateButton);
          updateButton.addEventListener("click", async () => {
            console.log("update");
            const id = li.dataset._id;
            try {
              const response = await fetch(`/user/update/${id}`, {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              if (response.ok) {
                console.log("User updated");
              }
            } catch (err) {
              console.log(err);
            }
          });
        });
      }
    } else {
      console.log("Failed to fetch users");
    }
  } catch (err) {
    console.log("Error:", err);
  }
};

getAdminUsers();

const adminAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        if (!decodedToken.roles.includes("admin")) {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

// const userAuth = async (req, res) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, secret, (err, decodedToken) => {
//       if (err) {
//         return res.status(400).json({ message: "Not authorized" });
//       } else {
//         if (decodedToken.roles != "Basic") {
//           return res.status(401).json({ message: "Not authorized" });
//         } else {
//           next();
//         }
//       }
//     });
//   } else {
//     return res
//       .status(401)
//       .json({ message: "Not authorized, token not available" });
//   }
// };

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.roles.includes("admin")) {
        return res.status(400).json({ message: "User is already an admin" });
      }
      user.roles.push("admin");
      await user.save();
      res.status(201).json({ message: "User role updated successfully", user });
    } else {
      res.status(400).json({ message: 'Role must be "admin"' });
    }
  } catch (error) {
    console.log({ message: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete({ _id: id });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Delete successfully" });
  } catch (error) {
    console.log({ message: error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUsers,
  deleteUser,
  updateUser,
  adminAuth,
};

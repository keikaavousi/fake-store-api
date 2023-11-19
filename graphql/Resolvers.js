// const User = require("../models/User");

const resolvers = {
  // getUser: async ({ id }) => {
  //   try {
  //     const user = await User.findById(id);
  //     return user;
  //   } catch (err) {
  //     throw new Error("Error retrieving user");
  //   }
  // },
  // getUsers: async () => {
  //   try {
  //     const users = await User.find();
  //     return users;
  //   } catch (err) {
  //     throw new Error("Error retrieving users");
  //   }
  // },
  // createUser: async ({ name, email, password }) => {
  //   try {
  //     const user = new User({ name, email, password });
  //     await user.save();
  //     return user;
  //   } catch (err) {
  //     throw new Error("Error creating user");
  //   }
  // },
  // updateUser: async ({ id, name, email, password }) => {
  //   try {
  //     const user = await User.findByIdAndUpdate(
  //       id,
  //       { name, email, password },
  //       { new: true }
  //     );
  //     return user;
  //   } catch (err) {
  //     throw new Error("Error updating user");
  //   }
  // },
  // deleteUser: async ({ id }) => {
  //   try {
  //     const user = await User.findByIdAndRemove(id);
  //     return user;
  //   } catch (err) {
  //     throw new Error("Error deleting user");
  //   }
  // },
};

module.exports = resolvers;

import { userService } from "../services/userService.js";

const getAllUsers = async (req, res) => {
    const users = await userService.getAll();
    res.json(users); 
}

const getUserById = async (req, res) => {
   const user =  await userService.getById(req.params.id);
    res.json(user); 
}

const addUser = async (req, res) => {
  const userData = req.body;
  const newUser = await userService.add(userData);
  res.json(newUser);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const userInfo = req.body;
  const updatedUser = await userService.update(id, userInfo);
  res.json(updatedUser);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { deletedCount } = await userService.deleteIt(id);
  res.json({ deletedCount });
};

export const userControllers = {
    getAllUsers,
    getUserById,
    addUser, 
    updateUser, 
    deleteUser
};

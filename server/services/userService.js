import { db } from '../db/db.js';
import bcrypt from "bcryptjs";
import { User } from '../models/users.js';

const getAll = async () => { 
    const allUsers = await db.getAllInCollection(db.USERS); 
    return allUsers.map(u => User.fromUserDocument(u));
}

const getById = async (id) => {
  const userDoc = await db.getById(db.USERS, id);
  return User.fromUserDocument(userDoc);
}

const add = async (userInfo) => {
    if (!userInfo.username || !userInfo.password || !userInfo.firstName || !userInfo.lastName || !userInfo.role) {
        throw new Error("Missing required fields for user creation");
    }

    const hashedPassword = await bcrypt.hash(userInfo.password, 10);
    const userToInsert = { ...userInfo, password: hashedPassword };

    const result = await db.addToCollection(db.USERS, userToInsert);

    if (!result.insertedId) {
        throw new Error("DB insertion failed");
    }

    return {
        id: result.insertedId.toString(),
        username: userToInsert.username,
    }
}

const update = async (id, userInfo, isAdmin = false) => {
    if (!isAdmin) delete userInfo.role;
    if (userInfo.password) {
        userInfo.password = await bcrypt.hash(userInfo.password, 10);
    }
    await db.updateById(db.USERS, id, userInfo);
    return {
        id,
        ...userInfo
    }
}

const deleteIt = async (id) => {
    const { deletedCount } = await db.deleteFromCollectionById(db.USERS, id);
    return { deletedCount };
}

export const userService = {
    getById,
    add,
    update,
    deleteIt,
    getAll,
}
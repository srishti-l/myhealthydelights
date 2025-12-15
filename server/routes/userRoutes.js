import express from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db/db.js';
import jwt from 'jsonwebtoken';
import { authenticateJWT, authorize } from '../middleware/authMiddleware.js';
import { userControllers } from '../controllers/userControllers.js';

const userRouter = express.Router();

// CREATE ACCOUNT 
userRouter.post('/register', async (req, res) => {
    const { firstName, lastName, username, password } = req.body;

    if (!firstName || !lastName || !username || !password) {
        return res.status(400).json({ error: 'Missing Fields' });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = {
        firstName,
        lastName,
        username,
        password: hashed,
        role: 'customer',
    };

    const inserted = await db.addToCollection(db.USERS, newUser);

    return res.status(201).json({
        message: "User created successfully",
        user: {
            id: inserted.insertedId, 
            firstName, 
            lastName, 
            username,
            password,
            role: newUser.role,
        }
    });

});

userRouter.get('/me', authenticateJWT, async (req, res) => {
    req.params.id = req.user.id;
    await userControllers.getUserById(req, res);
})

userRouter.patch('/me', authenticateJWT, async (req, res) => {
    req.params.id = req.user.id;
    await userControllers.updateUser(req, res);
})

userRouter.delete('/me', authenticateJWT, async (req, res) => {
    req.params.id = req.user.id;
    await userControllers.deleteUser(req, res);
})


userRouter.get('/', authenticateJWT, authorize('admin'), userControllers.getAllUsers);


export { userRouter };



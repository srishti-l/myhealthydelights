import express from 'express';
import { validateLogin } from '../services/authService.js';

const loginRouter = express.Router();

loginRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    try {
        const user = await validateLogin(username, password); 
        res.json(user); 
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: err.message });
    }
});


export { loginRouter };

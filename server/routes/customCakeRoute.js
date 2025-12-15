import express from 'express';
import { db } from '../db/db.js';

const customCakeRouter = express.Router();

customCakeRouter.post('/', async (req, res) => {
    const cakeOrder = req.body;
    const result = await db.addToCollection(db.CUSTOM_CAKES, cakeOrder);
    if (!result.insertedId) {
        return res.status(500).json({ error: "Failed to save order" });
    }
    res.status(201).json({ message: "Order submitted successfully" });


})

export default customCakeRouter; 
import express from 'express';
import cors from 'cors';

import { db } from './db/db.js';
import { productRouter } from './routes/productRoutes.js';
import { loginRouter } from './routes/loginRoute.js';
import { userRouter } from './routes/userRoutes.js';
import customCakeRouter from './routes/customCakeRoute.js';

const port = 6790;
const app = express();


app.use(cors());
app.use(express.json());

app.use('/products', productRouter);
app.use('/users', loginRouter);
app.use('/users', userRouter);
app.use('/customcakeorder', customCakeRouter)

const startServer = async () => {
  await db.init();  
  app.listen(port, () => console.log(`Server running on port ${port}`));
};

startServer();

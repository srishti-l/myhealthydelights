import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { db } from './db/db.js';
import { productRouter } from './routes/productRoutes.js';
import { loginRouter } from './routes/loginRoute.js';
import { userRouter } from './routes/userRoutes.js';
import customCakeRouter from './routes/customCakeRoute.js';

const port = 6790;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serverPath =  path.join(__dirname, '..');

app.use(cors());
app.use(express.json());


app.use(
  express.static(
    path.join(
      serverPath, 'client/build')
));

app.get('/', (req, res) => {
  res.sendFile(
    path.join(
      serverPath, 'client/build/index.html'));
});

app.use('/products', productRouter);
app.use('/users', loginRouter);
app.use('/users', userRouter);
app.use('/customcakeorder', customCakeRouter)

const startServer = async () => {
  await db.init();  
  app.listen(port, () => console.log(`Server running on port ${port}`));
};

startServer();

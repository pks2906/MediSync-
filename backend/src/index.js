import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import hospitalRoutes from './routes/hospitalRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import requestRoutes from './routes/requestRoutes.js';


dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Medical Resource Coordination Platform API is running.');
});

app.use('/api', hospitalRoutes);
app.use('/api', resourceRoutes);
app.use('/api', requestRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});

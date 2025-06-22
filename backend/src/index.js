import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import http from 'http';
import { Server } from 'socket.io';

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

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(' New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log(' Client disconnected:', socket.id);
  });
});

app.set('io', io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});

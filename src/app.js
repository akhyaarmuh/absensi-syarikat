import ip from 'ip';
import open from 'open';
import path from 'path';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';

import { __dirname } from './utilities/index.js';
import { PORT, API_VERSION, NODE_ENV } from './secret.js';
import errorHandler from './middlewares/error-handler.js';
import backupDatabase from './utilities/backup-database.js';

import rootRouter from './routes/index.js';

export const prismaClient = new PrismaClient();
await backupDatabase();

const app = express();

const port = PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());

app.use(`/${API_VERSION}`, rootRouter);

// client handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// set error middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.listen(port, ip.address(), () => {
  console.log(`Server running on: http://${ip.address()}:${port}`);
  if (!NODE_ENV) open(`http://localhost:${port}`, { app: 'chrome' });
  console.log('App started');
});

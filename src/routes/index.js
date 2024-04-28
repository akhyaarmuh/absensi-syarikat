import { Router } from 'express';

import authRouter from './auth.js';
import regionsRouter from './regions.js';
import memberRouter from './members.js';
import eventsRouter from './events.js';
import usersRouter from './users.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/regions', regionsRouter);
router.use('/members', memberRouter);
router.use('/events', eventsRouter);
router.use('/users', usersRouter);

export default router;

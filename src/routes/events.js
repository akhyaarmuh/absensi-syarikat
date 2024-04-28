import { Router } from 'express';

import validator from '../middlewares/validator.js';
import {
  createEvent,
  getAllEvent,
  updateEventById,
  deleteEventById,
  createAttendanceByIdEvent,
  getAttendaceDetailsByIdEvent,
} from '../controllers/events.js';
import verifyRoles from '../middlewares/verify-roles.js';
import verifyAccesToken from '../middlewares/verify-access-token.js';
import verifyRefreshToken from '../middlewares/verify-refresh-token.js';

const router = Router();

router.post(
  '/',
  verifyAccesToken,
  verifyRoles(['admin']),
  validator('createEvent'),
  createEvent
);
router.post('/:event_id', verifyRefreshToken, createAttendanceByIdEvent);
router.get('/', verifyRefreshToken, getAllEvent);
router.get('/:id/attendance-details', verifyRefreshToken, getAttendaceDetailsByIdEvent);
router.patch(
  '/:id',
  verifyAccesToken,
  verifyRoles(['admin']),
  validator('createEvent'),
  updateEventById
);
router.delete('/:id', verifyAccesToken, verifyRoles(['admin']), deleteEventById);

export default router;

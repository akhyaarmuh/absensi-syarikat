import { Router } from 'express';

import validator from '../middlewares/validator.js';
import {
  createUser,
  getAllUser,
  updateUserById,
  deleteUserById,
  getUserById,
} from '../controllers/users.js';
import verifyRoles from '../middlewares/verify-roles.js';
import verifyAccesToken from '../middlewares/verify-access-token.js';
import verifyRefreshToken from '../middlewares/verify-refresh-token.js';

const router = Router();

router.post(
  '/',
  verifyAccesToken,
  verifyRoles(['admin']),
  validator('createUser'),
  createUser
);
router.get('/', verifyRefreshToken, verifyRoles(['admin']), getAllUser);
router.get('/:id', verifyRefreshToken, getUserById);
router.patch('/:id', verifyAccesToken, validator('updateUser'), updateUserById);
router.delete('/:id', verifyAccesToken, verifyRoles(['admin']), deleteUserById);

export default router;

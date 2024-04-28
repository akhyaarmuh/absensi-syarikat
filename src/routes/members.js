import { Router } from 'express';

import validator from '../middlewares/validator.js';
import {
  createMember,
  getAllMember,
  updateMemberById,
  deleteMemberById,
  getMemberById,
  getAbsentDetailsById,
} from '../controllers/members.js';
import verifyRoles from '../middlewares/verify-roles.js';
import verifyAccesToken from '../middlewares/verify-access-token.js';
import verifyRefreshToken from '../middlewares/verify-refresh-token.js';

const router = Router();

router.post(
  '/',
  verifyAccesToken,
  verifyRoles(['admin']),
  validator('createMember'),
  createMember
);
router.get('/', verifyRefreshToken, getAllMember);
router.get('/:id', verifyRefreshToken, getMemberById);
router.get('/:id/absent-details', verifyRefreshToken, getAbsentDetailsById);
router.patch(
  '/:id',
  verifyAccesToken,
  verifyRoles(['admin']),
  validator('createMember'),
  updateMemberById
);
router.delete('/:id', verifyAccesToken, verifyRoles(['admin']), deleteMemberById);

export default router;

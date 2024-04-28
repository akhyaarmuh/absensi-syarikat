import { Router } from 'express';

import validator from '../middlewares/validator.js';
import {
  createRegion,
  getAllRegion,
  updateRegionById,
  deleteRegionById,
} from '../controllers/regions.js';
import verifyRoles from '../middlewares/verify-roles.js';
import verifyAccesToken from '../middlewares/verify-access-token.js';
import verifyRefreshToken from '../middlewares/verify-refresh-token.js';

const router = Router();

router.post(
  '/',
  verifyAccesToken,
  verifyRoles(['admin']),
  validator('createRegion'),
  createRegion
);
router.get('/', verifyRefreshToken, getAllRegion);
router.patch(
  '/:id',
  verifyAccesToken,
  verifyRoles(['admin']),
  validator('createRegion'),
  updateRegionById
);
router.delete('/:id', verifyAccesToken, verifyRoles(['admin']), deleteRegionById);

export default router;

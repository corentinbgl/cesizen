import { Router } from 'express';
import {
  getAllInformations,
  getInformationBySlug,
  createInformation,
  updateInformation,
  deleteInformation,
} from '../controllers/information.controller';

const router = Router();

router.get('/', getAllInformations);
router.get('/:slug', getInformationBySlug);
router.post('/', createInformation);     // à protéger (admin)
router.patch('/:id', updateInformation); // à protéger (admin)
router.delete('/:id', deleteInformation); // à protéger (admin)

export default router;

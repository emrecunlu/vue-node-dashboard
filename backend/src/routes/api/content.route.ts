import { Router } from 'express';
import {
	insert,
	get,
	remove,
	update,
	getAll,
} from '../../controllers/api/content.controller';
import Validator from '../../middlewares/Validator';
import { updateSchema } from '../../validations/content.validation';

const router = Router();

router.post('/add', insert);
router.get('/:slug', get);
router.get('/', getAll);
router.delete('/:id([0-9]+)', remove);
router.put('/:id([0-9]+)', Validator(updateSchema), update);

export default router;

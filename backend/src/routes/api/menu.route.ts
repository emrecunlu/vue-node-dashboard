import { Router } from 'express';
import {
	getAll,
	insert,
	remove,
	update,
} from '../../controllers/api/menu.controller';
import {
	insertSchema,
	updateSchema,
} from '../../validations/menu.validation';
import Validator from '../../middlewares/Validator';

const router = Router();

router.get('/', getAll);
router.post('/add', Validator(insertSchema), insert);
router.delete('/:id([0-9]+)', remove);
router.put('/:id([0-9]+)', Validator(updateSchema), update);

export default router;

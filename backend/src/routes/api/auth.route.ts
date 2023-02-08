import { Router } from 'express';
import { register, login, token } from '../../controllers/api/auth.controller';
import Validator from '../../middlewares/Validator';
import {
	loginSchema,
	refreshSchema,
	registerSchema,
} from '../../validations/auth.validation';

const router = Router();

router.post('/register', Validator(registerSchema), register);
router.post('/login', Validator(loginSchema), login);
router.post('/token', Validator(refreshSchema), token);

export default router;

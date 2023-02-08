import { Router } from 'express';
import { resize } from '../../helpers/Image';

const router = Router();

router.get('/', async function (req, res) {

	res.render('index', {resize});
});

export default router;

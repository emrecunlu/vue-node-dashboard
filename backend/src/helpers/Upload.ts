import { randomUUID } from 'crypto';
import multer from 'multer';
import ApiError from '../models/ApiError';

const allowedTypes: string[] = ['image/png', 'image/jpg', 'image/jpeg'];

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, process.env.STATIC_DIR as string);
	},
	filename: (req, file, cb) => {
		const fileName = randomUUID() + '.' + file.mimetype.split('/')[1];

		file.originalname = fileName;

		cb(null, fileName);
	},
});

const Upload = multer({
	storage,
	preservePath: true,
	fileFilter(req, file, cb) {
		if (allowedTypes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new ApiError('İzin verilmeyen dosya tipi'));
		}
	},
}).single('image');

export default Upload;

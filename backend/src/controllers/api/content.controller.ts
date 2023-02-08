import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import Upload from '../../helpers/Upload';
import ApiError from '../../models/ApiError';
import {
	insertSchema,
	updateSchema,
} from '../../validations/content.validation';
import { StatusCodes } from 'http-status-codes';
import { removeFile } from '../../helpers/File';
import { removeImages, resize } from '../../helpers/Image';

const prisma = new PrismaClient();

export const insert = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	Upload(req, res, async function (err) {
		try {
			if (err) {
				throw new ApiError(
					err,
					StatusCodes.BAD_REQUEST,
					'Dosya yükleme hatası'
				);
			}

			const { error, value } = insertSchema.validate(req.body, {
				abortEarly: true,
			});

			if (error) {
				throw new ApiError(error.message);
			}

			const menu = await prisma.menu.findUnique({
				where: {
					id: value.menuId,
				},
			});

			if (!menu) {
				throw new ApiError('Menu bulunamadı');
			}

			const inserted = await prisma.content.create({
				data: {
					...value,
					image: req.file?.originalname,
				},
			});

			resize(req.file?.originalname);

			res.send(inserted);
		} catch (error) {
			if (req?.file) {
				removeImages(req.file.originalname);
			}

			next(error);
		}
	});
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { slug } = req.params;

		const content = await prisma.content.findFirst({
			where: {
				slug: `/${slug}`,
			},
			include: {
				menu: true,
			},
		});

		if (!content) {
			throw new ApiError('Sayfa bulunamadı', StatusCodes.NOT_FOUND);
		}

		res.send(content);
	} catch (err) {
		next(err);
	}
};

export const remove = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = parseInt(req.params.id);

		const content = await prisma.content.findUnique({
			where: {
				id,
			},
		});

		if (!content) {
			throw new ApiError('Lütfen geçerli id giriniz');
		}

		await prisma.content.delete({
			where: {
				id,
			},
		});

		if (content.image) {
			removeImages(content.image);
		}

		res.send({ message: 'Sayfa başarıyla silindi' });
	} catch (err) {
		next(err);
	}
};

export const update = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	Upload(req, res, async function (err) {
		try {
			if (err) {
				throw new ApiError(
					err,
					StatusCodes.BAD_REQUEST,
					'Dosya yükleme hatası'
				);
			}

			const id = parseInt(req.params.id);

			const { error, value } = updateSchema.validate(req.body, {
				abortEarly: true,
			});

			if (error) {
				throw new ApiError(error.message);
			}

			const content = await prisma.content.findUnique({
				where: {
					id,
				},
			});

			if (!content) {
				throw new ApiError('Lütfen geçerli id giriniz');
			}

			if (req.file && content.image) {
				removeImages(content.image);
			}

			const updated = await prisma.content.update({
				where: {
					id,
				},
				data: {
					...value,
					image: req.file?.originalname,
				},
			});

			resize(req.file?.originalname);

			res.send(updated);
		} catch (err) {
			console.log(err);
			next(err);
		}
	});
};

export const getAll = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const contents = await prisma.content.findMany({
			include: {
				menu: true,
			},
		});

		res.send(contents);
	} catch (err) {
		next(err);
	}
};

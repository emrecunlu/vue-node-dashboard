import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import ApiError from '../../models/ApiError';

const prisma = new PrismaClient();

export const insert = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { slug } = req.body;

		const menu = await prisma.menu.findFirst({
			where: {
				slug,
			},
		});

		if (menu) {
			throw new ApiError('Adres zaten kayıtlı');
		}

		const inserted = await prisma.menu.create({
			data: req.body,
		});

		res.send(inserted);
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

		const menu = await prisma.menu.findFirst({
			where: { id },
			include: {
				Content: true,
			},
		});

		if (!menu) {
			throw new ApiError('Menü bulunamadı');
		}

		if (menu.Content.length > 0) {
			throw new ApiError('Lütfen menüye bağlı olan sayfaları siliniz.');
		}

		const deleted = await prisma.menu.delete({
			where: {
				id,
			},
		});

		res.send(deleted);
	} catch (err) {
		next(err);
	}
};

export const update = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = parseInt(req.params.id);

		const menu = await prisma.menu.findFirst({
			where: { id },
		});

		if (!menu) {
			throw new ApiError('Menü bulunamadı');
		}

		const updated = await prisma.menu.update({
			data: req.body,
			where: {
				id,
			},
		});

		res.send(updated);
	} catch (err) {
		next(err);
	}
};

export const getAll = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const menus = await prisma.menu.findMany({
			select: {
				id: true,
				title: true,
				slug: true,
				active: true,
				Content: {
					select: {
						id: true,
						title: true,
						slug: true,
					},
				},
			},
		});

		const lists = menus.map((menu) => {
			const obj: any = menu;

			obj['children'] = obj['Content'];

			delete obj['Content'];

			return obj;
		});

		res.send(lists);
	} catch (err) {
		next(err);
	}
};

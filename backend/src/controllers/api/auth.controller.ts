import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../../models/ApiError';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

const tokens: string[] = [];

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { username, password } = req.body;

		const admin = await prisma.admin.findFirst({
			where: {
				username,
			},
		});

		if (admin) {
			throw new ApiError('Böyle bir kullanıcı zaten kayıtlı.');
		}

		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);

		await prisma.admin.create({
			data: {
				...req.body,
				password: passwordHash,
			},
		});

		res.send({ message: 'Kullanıcı kaydı başarılı.' });
	} catch (err) {
		next(err);
	}
};

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { username, password } = req.body;

		const user = await prisma.admin.findFirst({
			where: {
				username,
			},
		});

		if (!user) {
			throw new ApiError('Kullanıcı adı veya şifre hatalı');
		}

		const match = await bcrypt.compare(password, user.password);

		if (!match) {
			throw new ApiError('Kullanıcı adı veya şifre hatalı');
		}

		const accessToken = jwt.sign(
			{ id: user.id },
			process.env.ACCESS_KEY as string,
			{
				expiresIn: process.env.ACCESS_TIME as string,
			}
		);

		const refreshToken = jwt.sign(
			{ id: user.id },
			process.env.REFRESH_KEY as string,
			{
				expiresIn: process.env.REFRESH_TIME as string,
			}
		);

		tokens.push(refreshToken);

		res.send({
			credentials: {
				name: user.name,
				surname: user.surname,
			},
			message: 'Girişi başarılı',
			accessToken,
			refreshToken,
		});
	} catch (err) {
		next(err);
	}
};

export const token = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { token } = req.body;

		if (!tokens.includes(token)) {
			throw new ApiError('Geçersiz refresh token', StatusCodes.FORBIDDEN);
		}

		jwt.verify(
			token,
			process.env.REFRESH_KEY as string,
			function (err: any, user: any) {
				if (err) {
					next(err);
				}

				if (!user?.id) {
					return res
						.status(StatusCodes.FORBIDDEN)
						.send({ message: 'Token expired' });
				}

				const accessToken = jwt.sign(
					{ id: user.id },
					process.env.REFRESH_KEY as string,
					{
						expiresIn: process.env.REFRESH_TIME as string,
					}
				);

				return res.send({ accessToken });
			}
		);
	} catch (err) {
		console.log(err);
		next(err);
	}
};

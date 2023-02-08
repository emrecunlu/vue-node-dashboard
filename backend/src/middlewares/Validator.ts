import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../models/ApiError';
import joi from 'joi';

export default function Validator(schema: joi.ObjectSchema) {
	return async function (req: Request, res: Response, next: NextFunction) {
		try {
			const { error, value } = schema.validate(req.body, { abortEarly: true });

			if (error) {
				throw new ApiError(error.message, StatusCodes.BAD_REQUEST, 'Validasyon Hatası')
			}

         req.body = value;

         next();
		} catch (err) {
			next(err);
		}
	};
}

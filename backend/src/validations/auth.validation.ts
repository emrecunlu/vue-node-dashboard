import joi from 'joi';

export const registerSchema = joi.object().keys({
	name: joi.string().max(25).min(3).required(),
	surname: joi.string().max(25).min(3).required(),
	username: joi.string().max(25).min(3).required(),
	password: joi.string().max(25).min(5).required(),
});

export const loginSchema = joi.object().keys({
	username: joi.string().required(),
	password: joi.string().required(),
});

export const refreshSchema = joi.object().keys({
	token: joi.string().required(),
});

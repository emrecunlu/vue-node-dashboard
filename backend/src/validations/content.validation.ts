import joi from 'joi';

export const insertSchema = joi.object().keys({
	title: joi.string().min(5).max(255).required(),
	slug: joi.string().max(255).required(),
	brief: joi.string().min(5).max(50).required(),
	markdown: joi.string().required(),
	icon: joi.string().max(255),
	menuId: joi.number().required(),
});

export const updateSchema = joi.object().keys({
	title: joi.string().min(5).max(255),
	slug: joi.string().max(255),
	brief: joi.string().min(5).max(50),
	markdown: joi.string(),
	icon: joi.string().max(255),
	menuId: joi.number(),
});

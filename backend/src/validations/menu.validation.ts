import joi from 'joi';

export const insertSchema = joi.object().keys({
	title: joi.string().max(255).required(),
	slug: joi.string().max(255).required(),
	active: joi.boolean(),
});

export const updateSchema = joi.object().keys({
   title: joi.string().max(255),
	slug: joi.string().max(255),
	active: joi.boolean(),
})
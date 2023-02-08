import fs from 'fs';
import sharp from 'sharp';

const sizes: { suffix: string; width: number; height: number }[] = [
	{
		suffix: 'thumbnail',
		width: 100,
		height: 100,
	},
	{
		suffix: 'small',
		width: 480,
		height: 480,
	},
	{
		suffix: 'medium',
		width: 720,
		height: 720,
	},
	{
		suffix: 'large',
		width: 1080,
		height: 1080,
	},
	{
		suffix: 'xlarge',
		width: 1440,
		height: 1440,
	},
];

export const resize = (name: string | null | undefined) => {
	if (!name) {
		return false;
	}

	const [originalName] = name.split('.');

	sizes.forEach((size, index) => {
		const path = `${process.env.STATIC_DIR as string}/${name}`;
		const dir = `${process.env.STATIC_DIR as string}/${size.width}x${
			size.height
		}`;

		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}

		if (fs.existsSync(path)) {
			sharp(path)
				.webp()
				.resize({
					width: size.width,
					height: size.height,
				})
				.toFile(`${dir}/${originalName}.webp`);
		}
	});
};

export const removeImages = (name: string | null | undefined) => {
	if (!name) {
		return false;
	}

	const [originalName] = name.split('.');
	const path = `${process.env.STATIC_DIR as string}/${name}`;

	if (fs.existsSync(path)) {
		fs.unlinkSync(path)
	}

	sizes.forEach((size, index) => {
		
		
		const resizedPath = `${process.env.STATIC_DIR as string}/${size.width}x${size.height}/${originalName}.webp`

		if (fs.existsSync(resizedPath)) {
			fs.unlinkSync(resizedPath)
		}

	});
};

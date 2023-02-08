import fs from 'fs';

export const removeFile = (fileName: string) => {
	const file: string = `${process.env.STATIC_DIR as string}/${fileName}`;

	const fileExist = fs.existsSync(file);

	if (fileExist) {
		fs.unlinkSync(file);
	}
};
export const validationErrors = (data) => {
	return data.$errors.map((error) => (error ? error.$message : []));
};

export const setFormData = (data) => {
	const formData = new FormData();

	Object.entries(data).map((item) => {
		formData.append(item[0].toString(), item[1]);
	});

	return formData;
};
export const fileUpload = async (file) => {
	const cloudURL = 'https://api.cloudinary.com/v1_1/dqv604yhf/upload';

	const formData = new FormData();
	formData.append('upload_preset', 'react-journal');
	formData.append('file', file);

	try {
		const res = await fetch(cloudURL, {
			method: 'POST',
			body: formData,
		});

		if (res.ok) {
			const { secure_url } = await res.json();
			return secure_url;
		} else {
			throw await res.json();
		}
	} catch (error) {
		throw error;
	}
};

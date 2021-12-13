import { useState } from 'react';

export const useForm = (initialState = {}) => {
	const [values, setValues] = useState(initialState);

	const reset = (newState = initialState) => {
		setValues(newState);
	};

	const handleInputchange = ({ target }) => {
		setValues({ ...values, [target.name]: target.value });
	};

	return [values, handleInputchange, reset];
};

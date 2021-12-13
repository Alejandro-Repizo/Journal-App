import React, { useEffect } from 'react';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';


export const RegisterScreen = () => {
	const dispatch = useDispatch();
	const { msgError } = useSelector(state => state.ui)

	useEffect(() => {
		dispatch(removeError())
	}, [dispatch])
	
	const [{ name, email, password, password2 }, handleInputchange] = useForm({
		name: 'Helen',
		email: 'alejo@gmail.com',
		password: '123456',
		password2: '123456',
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isFormValid()) {
			dispatch(startRegisterWithEmailPasswordName(email, password, name));
		}
	};

	const isFormValid = () => {
		if (validator.isEmpty(name)) {
			dispatch(setError('name is required'));
			return false;
		} else if (!validator.isEmail(email)) {
			dispatch(setError('Email is not valid'));
			return false;
		} else if (password !== password2 || password.length < 5) {
			dispatch(setError('Password should be at least 6 characters and math each other'));
			return false;
		}
		dispatch(removeError());
		return true;
	};

	return (
		<>
			<div className='card__icon'>
				<i className='fas fa-meteor icon'></i>
			</div>
			<h3 className='card__title'>Sign up</h3>

			<form
				className='card__form  animate__animated animate__fadeIn animate__faster'
				onSubmit={handleSubmit}
			>
				<div className='card__form--group'>
					<label className='card__label' htmlFor='name'>
						Name
					</label>
					<input
						className='card__input'
						value={name}
						onChange={handleInputchange}
						type='text'
						name='name'
					/>
				</div>
				<div className='card__form--group'>
					<label className='card__label' htmlFor='email'>
						Email
					</label>
					<input
						className='card__input'
						value={email}
						onChange={handleInputchange}
						type='text'
						name='email'
						autoComplete='off'
					/>
				</div>
				<div className='card__form--group'>
					<label className='card__label' htmlFor='password'>
						Password
					</label>
					<input
						className='card__input'
						value={password}
						onChange={handleInputchange}
						type='password'
						name='password'
					/>
				</div>

				<div className='card__form--group'>
					<label className='card__label ' htmlFor='password2'>
						Confirm password
					</label>
					<input
						className='card__input'
						value={password2}
						onChange={handleInputchange}
						type='password'
						name='password2'
					/>
				</div>

				<button type='submit' className='card__button'>
					Sign Up
				</button>

				{msgError && (
					<div className='alert-error animate__animated animate__bounce'>{msgError}</div>
				)}

				<div className='mt-5 mb-5'>
					<Link className='card__link' to='/auth/login'>
						Already registered?
					</Link>
				</div>
			</form>
		</>
	);
};

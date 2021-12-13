import React, { useEffect} from 'react';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { startLoginEmailPassword, startGoogleLogin } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';

export const LoginScreen = () => {
	const { msgError, loading } = useSelector((state) => state.ui);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(removeError());
	}, [dispatch]);

	const [{ email, password }, handleInputchange] = useForm({
		email: 'alejo@gmail.com',
		password: '123456',
	});

	const handleLogin = (e) => {
		e.preventDefault();
		isFormValid() && dispatch(startLoginEmailPassword(email, password));
	};

	const handleGoogleLogin = () => {
		dispatch(startGoogleLogin());
	};

	const isFormValid = () => {
		if (!validator.isEmail(email)) {
			dispatch(setError('Email is not valid'));
			return false;
		} else if (validator.isEmpty(password)) {
			dispatch(setError('Password is required'));
			return false;
		}

		dispatch(removeError());
		return true;
	};

	return (
		<>
			<div className='card__icon'>
				<i className='fas fa-user-astronaut icon'></i>
			</div>
			<h3 className='card__title'>Sign in</h3>
			<form className='card__form animate__animated animate__fadeIn animate__faster' onSubmit={handleLogin}>
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
				<button type='submit' className='card__button' disabled={loading}>
					Sign In
				</button>

				<div className='card__social'>
					<p className='social__title'>OR</p>
					<div className='google-btn' onClick={handleGoogleLogin}>
						<div className='google-icon-wrapper'>
							<img
								className='google-icon'
								src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
								alt='google button'
							/>
						</div>
						<p className='btn-text'>
							<b>Sign in with google</b>
						</p>
					</div>
				</div>

				{msgError && <div className='alert-error animate__animated animate__bounce'>{msgError}</div>}

				<div className='mb-5'>
					<Link className='card__link' to='/auth/register'>
						Create a new account
					</Link>
				</div>
			</form>
		</>
	);
};

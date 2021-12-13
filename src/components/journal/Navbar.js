import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startLogout } from '../../actions/auth';

export const Navbar = () => {
	const { name, photo } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(startLogout());
	};

	return (
		<div className='navbar'>
			<div className='navabar__logo'>
				<i className='fas fa-calendar-day navbar__icon'></i>
				<h1 className='navbar-text'>JournalApp</h1>
			</div>
			<div className='navbar__info'>
				<div className='navbar__user'>
					<img src={photo} className='navbar__userimage' alt={name} />
					<span className='navbar__name'>{name}</span>
				</div>
				<button className='navbar__button btn' onClick={handleLogout}>
					<i className='fas fa-sign-out-alt'></i>
				</button>
			</div>
		</div>
	);
};

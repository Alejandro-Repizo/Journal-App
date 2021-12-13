import React from 'react';
import { useSelector } from 'react-redux';

import { Sidebar } from './Sidebar';
import { NothingSelected } from './NothingSelected';
import { NoteScreen } from '../notes/NoteScreen';
import { Navbar } from './Navbar';

export const JournalScreen = () => {
	const { active } = useSelector((state) => state.notes);

	return (
		<div className='journal__main-content  animate__animated animate__fadeIn animate__faster'>
			<Navbar />
			<Sidebar />
			<main className='journal__content'>
				{active ? <NoteScreen /> : <NothingSelected />}
			</main>
		</div>
	);
};

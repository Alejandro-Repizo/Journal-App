import React from 'react';
import { useDispatch } from 'react-redux';
import { startNewNote } from '../../actions/notes';

import { JournalEntries } from './JournalEntries';

export const Sidebar = () => {
	const dispatch = useDispatch()

	const handleAddNew = () => {
		dispatch(startNewNote())
	}
	
	return (
		<aside className='journal__sidebar'>
			<div className='journal__sidebar-navbar'>
				<div className='journal__title'>
					<i className='fas fa-pen journal__icon'></i>
					<span>Entries</span>
				</div>
				<i  onClick={handleAddNew} className='far fa-calendar-plus journal__new-entry'></i>
			</div>

			<JournalEntries />
		</aside>
	);
};

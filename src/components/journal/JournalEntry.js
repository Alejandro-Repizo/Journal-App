import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ id, date, title, body, url }) => {
	const dispatch = useDispatch();
	const noteDate = moment(date);

	const handleEntryClick = () => {
		dispatch(activeNote(id, { date, title, body, url }));
	};

	return (
		<div
			className='journal__entry pointer  animate__animated animate__bounceIn animate__faster'
			onClick={handleEntryClick}
		>
			{url && (
				<div
					className='journal__entry-picture'
					style={{
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundImage: `url(${url})`,
					}}
				></div>
			)}

			<div className='journal__entry-body'>
				<p className='journal__entry-title'>{title}</p>
				<p className='journal__entry-content'>
					{body?.length >= 200 ? `${body.slice(0, 200)}...` : body}
				</p>
			</div>

			<div className='journal__entry-date-box'>
				<span>{noteDate.format('dddd')}</span>
				<h4>{noteDate.format('d')}</h4>
			</div>
		</div>
	);
};

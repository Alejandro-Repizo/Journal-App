import moment from 'moment';
import React from 'react'
import { useSelector } from 'react-redux';

export const NotesImage = () => {

	const { active: { url, title, body, date } } = useSelector(state => state.notes)
	
	const noteDate = moment(date);

    return (
		<div className='image__container '>
			<div className='image'>
				<img src={url} alt={title} />
				<div className='image__footer'>
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
			</div>
		</div>
	);
}

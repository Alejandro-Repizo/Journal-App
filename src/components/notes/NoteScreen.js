import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';

import { NotesAppBar } from './NotesAppBar';
import { NotesImage } from './NotesImage';

export const NoteScreen = () => {
	const { active: note } = useSelector((state) => state.notes);
	const [formValues, handleInputChange, reset] = useForm(note);
	const { body, title } = formValues;

	const activeId = useRef(note.id);
	const dispatch = useDispatch();

	useEffect(() => {
		if (note.id !== activeId.current) {
			activeId.current = note.id;
			reset(note);
		}
	}, [note, reset]);

	useEffect(() => {
		dispatch(activeNote(formValues.id, { ...formValues }));
	}, [formValues, dispatch]);

	return (
		<div className='notes__main-content'>
			<NotesAppBar />

			<div className='notes__content '>
				<div className='notes__form '>
					<input
						type='text'
						placeholder='Some awesome title'
						className='notes__title-input'
						autoComplete='off'
						name='title'
						value={title}
						onChange={handleInputChange}
						autoFocus
					/>
					<textarea
						placeholder='What happened today?'
						className='notes_textarea'
						name='body'
						value={body}
						onChange={handleInputChange}
					></textarea>
				</div>

				{note.url && <NotesImage />}
			</div>
		</div>
	);
};

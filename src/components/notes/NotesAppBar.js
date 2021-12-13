import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startDeleting, startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {
	const dispatch = useDispatch();
	const { active: note } = useSelector((state) => state.notes);

	const handleSave = () => {
		dispatch(startSaveNote(note));
	};

	const handlePictureClick = () => {
		document.querySelector("#fileSelector").click();
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0]
		if (file) {
			dispatch(startUploading(file));
		}
	}

	const handleDelete = () => {
		dispatch( startDeleting(note.id))
	}

	return (
		<div className='notes__appbar'>
			<span className='notes__title'>Add a new day</span>

			<input
				id='fileSelector'
				name='file'
				type='file'
				style={{ display: 'none' }}
				onChange={handleFileChange}
			/>

			<div>
				<button className='btn btn__appbar' onClick={handlePictureClick}>
					Picture
				</button>
				<button className='btn  btn__appbar btn__appbar--dark' onClick={handleSave}>
					Save
				</button>
				<button className='btn  btn__appbar ' onClick={handleDelete}>
					Delete
				</button>
			</div>
		</div>
	);
};

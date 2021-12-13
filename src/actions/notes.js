import { db, addDoc, collection, updateDoc, doc, deleteDoc } from '../firebase/firebaseConfig';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';
import { Toast } from '../helpers/alert';
import { fileUpload } from '../helpers/fileUpload';
import Swal from 'sweetalert2';

export const startNewNote = () => {
	return async (dispatch, getState) => {
		const {
			auth: { uid },
		} = getState();

		const newNote = {
			title: '',
			body: '',
			date: new Date().getTime(),
		};

		try {
			const docRef = await addDoc(collection(db, `${uid}/journal/notes`), {
				...newNote,
			});
			dispatch(activeNote(docRef.id, newNote));
			dispatch(addNewNote(docRef.id , newNote));
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	};
};

export const activeNote = (id, note) => ({
	type: types.notesActive,
	payload: {
		id,
		...note,
	},
});


export const addNewNote = (id, note) => ({
	type: types.notesAddNew,
	payload: {
		id, note
	}
})

export const startLoadingNotes = (uid) => {
	return async (dispatch) => {
		const notes = await loadNotes(uid);
		dispatch(setNotes(notes));
	};
};

export const setNotes = (notes) => ({
	type: types.notesLoad,
	payload: notes,
});

export const startSaveNote = (note) => {
	return async (dispatch, getState) => {
		const {
			auth: { uid },
		} = getState();

		if (!note.url) {
			delete note.url;
		}

		const noteToFireStore = { ...note };
		delete noteToFireStore.id;

		try {
			await updateDoc(doc(db, `${uid}/journal/notes/${note.id}`), { ...noteToFireStore });
			dispatch(refreshNote(note.id, note));
			Toast.fire({
				icon: 'success',
				title: 'It has been saved successfully',
				timer: 3000,
			});
		} catch (e) {
			console.error('Error adding document: ', e);
			Toast.fire({
				icon: 'error',
				text: e,
				timer: 3000,
			});
		}
	};
};

export const refreshNote = (id, note) => ({
	type: types.notesUpdated,
	payload: {
		id,
		note: {
			...note,
		},
	},
});

export const startUploading = (file) => {
	return async (dispatch, getState) => {
		const {
			notes: { active },
		} = getState();

		Toast.fire({
			title: 'Uploading',
			didOpen: () => {
				Swal.showLoading();
			},
		});

		const fileUrl = await fileUpload(file);
		active.url = fileUrl;

		dispatch(startSaveNote(active));

		Toast.close();
	};
};

export const startDeleting = (id) => {
	return async (dispatch, getState) => {
		const {
			auth: { uid },
		} = getState();

		try {
			await deleteDoc(doc(db, `${uid}/journal/notes/${id}`));
			dispatch(deleteNote(id));
		} catch (e) {
			console.error(e);
			Toast.fire({
				icon: 'error',
				text: e,
				timer: 3000,
			});
		}
	};
};

export const deleteNote = (id) => ({
	type: types.notesDelete,
	payload: id,
});


export const noteLogout = () => ({
	type: types.notesLogoutCleaning
})
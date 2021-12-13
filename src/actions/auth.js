import { types } from '../types/types';
import {
	googleAuthProvider,
	getAuth,
	signInWithPopup,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
	signOut,
} from '../firebase/firebaseConfig';
import { startLoading, finistLoading } from './ui';
import { setError } from '../actions/ui';
import { noteLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {
	return (dispatch) => {
		const auth = getAuth();
		dispatch(startLoading());
		signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				dispatch(login(user.uid, user.displayName, user.photoURL));
			})
			.catch((e) => {
				if (e.code.includes('auth/user-not-found')) {
					dispatch(
						setError('There  is no user record corresponding to this identifier.')
					);
				} else if (e.code.includes('auth/wrong-password')) {
					dispatch(
						setError('The password is invalid or the user does not have a password.')
					);
				} else {
					dispatch(setError(e.message.replace('Firebase:', ' ')));
				}
			})
			.finally(() => {
				dispatch(finistLoading());
			});
	};
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
	return (dispatch) => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then(async ({ user }) => {
				await updateProfile(user, {
					displayName: name,
					photoURL: 'https://i.ibb.co/LR8CPmY/user-astronaut-solid.png',
				});

				dispatch(login(user.uid, user.displayName, user.photoURL));
			})
			.catch((e) => {
				dispatch(setError(e.message.replace('Firebase:', ' ')));
			});
	};
};

export const startGoogleLogin = () => {
	return (dispatch) => {
		const auth = getAuth();
		signInWithPopup(auth, googleAuthProvider).then(({ user }) => {
			dispatch(login(user.uid, user.displayName, user.photoURL));
		});
	};
};

export const login = (uid, displayName, photoURL) => ({
	type: types.login,
	payload: {
		uid,
		displayName,
		photoURL,
	},
});

export const startLogout = () => {
	return async (dispatch) => {
		const auth = getAuth();
		await signOut(auth);
		dispatch(login());
		dispatch(noteLogout())
	};
};
export const logout = () => ({
	types: types.logout,
});

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

import { LoaderScreen } from '../components/loader/LoaderScreen';
import { JournalScreen } from '../components/journal/JournalScreen';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { AuthRouter } from './AuthRouter';

import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {
	const [checking, setChecking] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, async (user) => {
			if (user?.uid) {
				dispatch(login(user.uid, user.displayName, user.photoURL));
				dispatch(startLoadingNotes(user.uid));
			}
			setChecking(false);
		});
	}, [dispatch, setChecking]);

	if (checking) {
		return <LoaderScreen />;
	}

	return (
		<Router>
			<Routes>
				<Route
					path='/auth/*'
					element={
						<PublicRoute>
							<AuthRouter />
						</PublicRoute>
					}
				/>
				<Route
					path='/'
					element={
						<PrivateRoute>
							<JournalScreen />
						</PrivateRoute>
					}
				/>

				<Route
					path='/*'
					element={
						<PublicRoute>
							<AuthRouter />
						</PublicRoute>
					}
				/>
			</Routes>
		</Router>
	);
};

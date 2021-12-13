// import firebase from "firebase"
// import "firebase/auth"

import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	updateDoc,
	doc,
	deleteDoc,
} from 'firebase/firestore';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBfeaPSV7-ji8rlwA9KqS13KKul5NVlxy4',
	authDomain: 'react-journal-app-dcf97.firebaseapp.com',
	projectId: 'react-journal-app-dcf97',
	storageBucket: 'react-journal-app-dcf97.appspot.com',
	messagingSenderId: '805233456214',
	appId: '1:805233456214:web:b86dd12f28c1fcd898b7f7',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export {
	db,
	doc,
	collection,
	addDoc,
	getDocs,
	updateDoc,
	deleteDoc,
	googleAuthProvider,
	getAuth,
	signInWithPopup,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
};

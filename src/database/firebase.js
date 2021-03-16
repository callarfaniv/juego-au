import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBcfpaINe8qx-hrIZhkS-xVoYH9oRjAj44',
    authDomain: 'juego-au.firebaseapp.com',
    projectId: 'juego-au',
    storageBucket: 'juego-au.appspot.com',
    messagingSenderId: '653435830102',
    appId: '1:653435830102:web:e881db94ed75c975fee0f7',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

//Generamos libreria reutilizable
export default {
    db,
    auth,
};

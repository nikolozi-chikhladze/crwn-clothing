import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD_tWC2dP1p3yEOTJyCJLt3PoYxC1auTGw",
    authDomain: "crwn-db-ea6b8.firebaseapp.com",
    projectId: "crwn-db-ea6b8",
    storageBucket: "crwn-db-ea6b8.appspot.com",
    messagingSenderId: "1088254261020",
    appId: "1:1088254261020:web:b1ce114dafa6e8e5e26cd9",
    measurementId: "G-SC9C430FME"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
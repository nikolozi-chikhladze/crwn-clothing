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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
               displayName,
               email,
               createdAt,
               ...additionalData 
            });
        } catch (err) {
            console.error('error creating user: ', err.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    })
    await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data();
        return {
            id: doc.id,
            routeName: encodeURI(title.toLowerCase()),
            title, 
            items,
        }
    })

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
}

export const getCurrentUser = () => {
    return new Promise((res, rej) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            res(userAuth);
        }, rej)
    })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
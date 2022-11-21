import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCUSmLUbgRCosiBCSiU1MSu1KAfR6qGFLY",
    authDomain: "proyectofinal-e0b74.firebaseapp.com",
    projectId: "proyectofinal-e0b74",
    storageBucket: "proyectofinal-e0b74.appspot.com",
    messagingSenderId: "917538414922",
    appId: "1:917538414922:web:fdded98f408828fd5521b3"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const storage= app.storage();
export const db = app.firestore();
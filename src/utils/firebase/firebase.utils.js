import {initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA29e8lEuA-w6RUO9is0FfFyiaPw1c11c4",
    authDomain: "crwn-clothing-ae00d.firebaseapp.com",
    projectId: "crwn-clothing-ae00d",
    storageBucket: "crwn-clothing-ae00d.appspot.com",
    messagingSenderId: "928352437247",
    appId: "1:928352437247:web:7c0c2a3bb36a94bb0d1dca"
  };
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account",
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, addtionalInformation ={}) => {
    if(!userAuth) return ;
    const userDocRef = doc(db, 'users', userAuth.uid );
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...addtionalInformation
            });
        } catch(e){
            console.log('error creating the user', e.message);
        }
    };
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return ;

    return await createUserWithEmailAndPassword(auth, email, password);

}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return ;

    return await signInWithEmailAndPassword(auth, email, password);

}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback );
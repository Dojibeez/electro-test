import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCPGlvfsmx4f_sjLjsek9tkcZW5U77S3ps",
    authDomain: "electro-chat-acff8.firebaseapp.com",
    projectId: "electro-chat-acff8",
    storageBucket: "electro-chat-acff8.appspot.com",
    messagingSenderId: "746004067490",
    appId: "1:746004067490:web:7627d76ba775a1dffe13fb"
  };

const app = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig) 
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };

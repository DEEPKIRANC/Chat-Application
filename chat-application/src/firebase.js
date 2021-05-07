import firebase from "firebase";

const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyAWX1wOZJcpAKS1K2pbypyEnLfTW3XM0lI",
  authDomain: "chat-app-a710c.firebaseapp.com",
  projectId: "chat-app-a710c",
  storageBucket: "chat-app-a710c.appspot.com",
  messagingSenderId: "200832564188",
  appId: "1:200832564188:web:fc471034cc3bab36b2ad19"
})

const db=firebaseApp.firestore();
const storage=firebaseApp.storage();
export {db,firebaseApp,storage};
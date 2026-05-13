import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBcnsiLWwv9bAeppBDOzaRPj18iN6RwFs",
  authDomain: "teste-3d566.firebaseapp.com",
  databaseURL: "https://teste-3d566-default-rtdb.firebaseio.com",
  projectId: "teste-3d566",
  storageBucket: "teste-3d566.firebasestorage.app",
  messagingSenderId: "790769727301",
  appId: "1:790769727301:web:fc6e4008cf056d8f8df02c",
  measurementId: "G-N8DF15XFLP"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
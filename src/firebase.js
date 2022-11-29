import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDvqxXkXMgl15weCuaq9HsmGTV3VyZSwLQ",
    authDomain: "netflix-clone-796a2.firebaseapp.com",
    projectId: "netflix-clone-796a2",
    storageBucket: "netflix-clone-796a2.appspot.com",
    messagingSenderId: "15206811403",
    appId: "1:15206811403:web:5a064b33ef20b9a664c40e"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore(); //database which is being used to store the user data
  const auth=firebase.auth(); //authentication which is being used to sign in the user

  /*export {auth};  //exporting the auth explicitly
  export default db;  //exporting the database*/

  export { auth, db };
import firebase from "firebase";
// import firestore from "firebase/firestore";

 // Initialize Firebase
const config = {
  apiKey: "AIzaSyAqf3QXvZKXLVhQgucqMxBcVzst8AinfbA",
  authDomain: "super-smoothies-10297.firebaseapp.com",
  databaseURL: "https://super-smoothies-10297.firebaseio.com",
  projectId: "super-smoothies-10297",
  storageBucket: "super-smoothies-10297.appspot.com",
  messagingSenderId: "439523516426"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

// Export firestore database
export default firebaseApp.firestore();

import firebase from "firebase";
import { Actions } from "jumpstate";
function initializeFirebase() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDk4AakHca-onFEQCOk0I47QElXODK0C_k",
    authDomain: "bitdirectory-88d92.firebaseapp.com",
    databaseURL: "https://bitdirectory-88d92.firebaseio.com",
    projectId: "bitdirectory-88d92",
    storageBucket: "",
    messagingSenderId: "362425104927"
  };
  try {
    firebase.initializeApp(config);
  } catch (errors) {
    if (__DEV__) console.log(errors);
  }
}
function readContact() {
  firebase.database().ref("/").once("value").then(function(snapshot) {
    Actions.VajraApp.getContact(snapshot.val());
  });
}

export { initializeFirebase, readContact };

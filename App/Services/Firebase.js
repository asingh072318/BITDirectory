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
function pushDataValues(databaseRef, updatedData) {
  try {
    //console.log("ref is ", databaseRef);
    databaseRef.update(updatedData);
  } catch (errors) {
    if (__DEV__) {
      console.log(errors);
    }
  }
}
function readGames() {
  firebase.database().ref("/games").once("value").then(function(snapshot) {
    //console.log(snapshot.val());
    Actions.VajraApp.updateGames(snapshot.val());
  });
}
function readImages() {
  firebase.database().ref("/Images").once("value").then(function(snapshot) {
    //console.log(snapshot.val());
    Actions.VajraApp.updateImages(snapshot.val());
  });
}

export { initializeFirebase, pushDataValues, readGames, readImages };

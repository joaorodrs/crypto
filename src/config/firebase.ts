import firebase from 'firebase/app'

const config = {
  apiKey: "AIzaSyDeC2BfmTEhj2njrBTjwnQEORqOMzR7H5A",
  authDomain: "crypto-295c2.firebaseapp.com",
  projectId: "crypto-295c2",
  storageBucket: "crypto-295c2.appspot.com",
  messagingSenderId: "542469268742",
  appId: "1:542469268742:web:f6779230239a9e40062a87",
  measurementId: "G-872W8QT3WZ",
  databaseURL: "https://crypto-295c2-default-rtdb.firebaseio.com/"
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
}

export const auth = firebase.auth()
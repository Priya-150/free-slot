// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, onValue, set, push } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBBWQ9QSs0eLQql_j1WOEcdVteIjpaJil4",
  authDomain: "smart-car-parking-37358.firebaseapp.com",
  projectId: "smart-car-parking-37358",
  storageBucket: "smart-car-parking-37358.firebasestorage.app",
  messagingSenderId: "130651437461",
  appId: "1:130651437461:web:5db5ae2903d6cc52ed1e9c",
  measurementId: "G-DVJHJ0HRBB"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue, set, push };

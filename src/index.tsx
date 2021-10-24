import React from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "scritch-4e385.firebaseapp.com",
  databaseURL: "https://scritch-4e385-default-rtdb.firebaseio.com",
  projectId: "scritch-4e385",
  storageBucket: "scritch-4e385.appspot.com",
  messagingSenderId: "196355494695",
  appId: "1:196355494695:web:fe0ea5f9d9225d2888cf02",
  measurementId: "G-VJ2Z6B6BVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

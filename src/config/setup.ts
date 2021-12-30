import {initializeApp} from '@firebase/app';
import { getAnalytics } from "firebase/analytics";
import reportWebVitals from '../reportWebVitals';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "scritch-4e385.firebaseapp.com",
  databaseURL: "https://scritch-4e385.firebaseio.com",
  projectId: "scritch-4e385",
  storageBucket: "scritch-4e385.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "1:196355494695:web:fe0ea5f9d9225d2888cf02",
  measurementId: "G-VJ2Z6B6BVS",
};

export const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

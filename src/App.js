import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EncounterPage from "./components/EncounterPage";
import LandingPage from "./components/LandingPage";
import "./styles.css";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/encounter/:id" element={<EncounterPage />} />
      </Routes>
    </Router>
  );
}

export { db };
export default App;

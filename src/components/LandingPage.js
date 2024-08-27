import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../App";

function LandingPage() {
  const [encounterName, setEncounterName] = useState("");
  const [encounterId, setEncounterId] = useState("");
  const navigate = useNavigate();

  const createEncounter = async () => {
    try {
      const docRef = await addDoc(collection(db, "encounters"), {
        name: encounterName,
        participants: [],
      });
      navigate(`/encounter/${docRef.id}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const joinEncounter = () => {
    navigate(`/encounter/${encounterId}`);
  };

  return (
    <div className="container">
      <h1>DnD Encounter Manager</h1>
      <div className="form-group">
        <label>Create a New Encounter</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter encounter name"
          value={encounterName}
          onChange={(e) => setEncounterName(e.target.value)}
        />
        <button className="btn btn-primary mt-3" onClick={createEncounter}>
          Create Encounter
        </button>
      </div>
      <hr />
      <div className="form-group">
        <label>Join an Existing Encounter</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter encounter ID"
          value={encounterId}
          onChange={(e) => setEncounterId(e.target.value)}
        />
        <button className="btn btn-secondary mt-3" onClick={joinEncounter}>
          Join Encounter
        </button>
      </div>
    </div>
  );
}

export default LandingPage;

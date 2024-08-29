import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../App";

function LandingPage() {
  const [encounterName, setEncounterName] = useState("");
  const [encounterId, setEncounterId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createEncounter = async () => {
    if (encounterName.trim() === "") {
      setError("Encounter name must have at least 1 character.");
      return;
    }

    setLoading(true);
    const sessionId = sessionStorage.getItem("sessionId") || Date.now().toString();
    sessionStorage.setItem("sessionId", sessionId);

    try {
      const docRef = await addDoc(collection(db, "encounters"), {
        name: encounterName,
        participants: [],
        createdBy: sessionId,
      });
      navigate(`/encounter/${docRef.id}`);
    } catch (e) {
      console.error("Error adding document: ", e);
      setError("Failed to create the encounter. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const joinEncounter = async () => {
    if (encounterId.trim() === "") {
      setError("Please enter a valid encounter ID.");
      return;
    }

    setLoading(true);
    try {
      const docRef = doc(db, "encounters", encounterId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        navigate(`/encounter/${encounterId}`);
      } else {
        setError("No such encounter exists. Please check the ID.");
      }
    } catch (e) {
      console.error("Error joining encounter: ", e);
      setError("Failed to join the encounter. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>DnD Encounter Manager</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group">
        <label>Create a New Encounter</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter encounter name"
          value={encounterName}
          onChange={(e) => setEncounterName(e.target.value)}
        />
        <button
          className="btn btn-primary mt-3"
          onClick={createEncounter}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Encounter"}
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
        <button
          className="btn btn-secondary mt-3"
          onClick={joinEncounter}
          disabled={loading}
        >
          {loading ? "Joining..." : "Join Encounter"}
        </button>
      </div>
    </div>
  );
}

export default LandingPage;

import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../App";
import AddParticipant from "./AddParticipant";
import InitiativeOrder from "./InitiativeOrder";

function EncounterPage() {
  const { id } = useParams();
  const [encounter, setEncounter] = useState(null);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);

  // Function to copy the encounter URL to the clipboard
  const copyUrlToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => alert("Encounter URL copied to clipboard!"))
      .catch((err) => console.error("Failed to copy the URL: ", err));
  };

  // Fetch the encounter data and set up a listener for real-time updates
  useEffect(() => {
    const docRef = doc(db, "encounters", id);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const encounterData = docSnap.data();
        setEncounter(encounterData);
        setCurrentTurnIndex(encounterData.currentTurnIndex || 0);
      } else {
        console.error("No such encounter!");
      }
    });

    return () => unsubscribe();
  }, [id]);

  // Function to add a participant
  const addParticipant = async (name, initiative, ac) => {
    if (!isCreator) return;

    const newParticipant = {
      id: Date.now(),
      name,
      initiative: parseInt(initiative, 10),
      ac,
    };
    const updatedParticipants = [
      ...encounter.participants,
      newParticipant,
    ].sort((a, b) => b.initiative - a.initiative);

    setEncounter((prev) => ({ ...prev, participants: updatedParticipants }));

    try {
      await updateDoc(doc(db, "encounters", id), {
        participants: updatedParticipants,
      });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  // Function to edit a participant's details
  const editParticipant = async (participantId, newInitiative, newAC) => {
    if (!isCreator) return;

    const updatedParticipants = encounter.participants
      .map((p) =>
        p.id === participantId
          ? {
              ...p,
              initiative: parseInt(newInitiative, 10),
              ac: parseInt(newAC, 10),
            }
          : p
      )
      .sort((a, b) => b.initiative - a.initiative);

    setEncounter((prev) => ({ ...prev, participants: updatedParticipants }));

    try {
      await updateDoc(doc(db, "encounters", id), {
        participants: updatedParticipants,
      });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  // Function to delete a participant
  const deleteParticipant = async (participantId) => {
    if (!isCreator) return;

    const updatedParticipants = encounter.participants.filter(
      (p) => p.id !== participantId
    );

    setEncounter((prev) => ({ ...prev, participants: updatedParticipants }));

    try {
      await updateDoc(doc(db, "encounters", id), {
        participants: updatedParticipants,
      });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  // Function to move to the next turn
  const nextTurn = async () => {
    const newTurnIndex = (currentTurnIndex + 1) % encounter.participants.length;
    setCurrentTurnIndex(newTurnIndex);

    try {
      await updateDoc(doc(db, "encounters", id), {
        currentTurnIndex: newTurnIndex,
      });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  // If encounter data is still loading
  if (!encounter) {
    return <div>Loading...</div>;
  }

  const sessionId = sessionStorage.getItem("sessionId");
  const isCreator = encounter.createdBy === sessionId;

  return (
    <div className="app-container">
      <h1 className="encounter-title">Encounter: {encounter.name}</h1>
      <button
        className="copy-url-btn btn btn-primary"
        onClick={copyUrlToClipboard}
      >
        Copy URL
      </button>
      <div className="content-container">
        {isCreator && (
          <div className="left-panel">
            <h2>Add Participants</h2>
            <AddParticipant addParticipant={addParticipant} />
          </div>
        )}
        <div className={isCreator ? "right-panel" : "full-width-panel"}>
          <InitiativeOrder
            participants={encounter.participants}
            currentTurnIndex={currentTurnIndex}
            nextTurn={isCreator ? nextTurn : null}
            editParticipant={isCreator ? editParticipant : null}
            deleteParticipant={isCreator ? deleteParticipant : null}
          />
        </div>
      </div>
    </div>
  );
}

export default EncounterPage;

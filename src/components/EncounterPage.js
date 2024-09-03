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

  const copyUrlToClipboard = () => {
    const url = window.location.href;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(url)
        .then(() => alert("Encounter URL copied to clipboard!"))
        .catch(() => alert("Failed to copy the URL. Please try again."));
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
        alert("Encounter URL copied to clipboard!");
      } catch {
        alert("Failed to copy the URL. Please try again.");
      }

      document.body.removeChild(textArea);
    }
  };

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

  const addParticipant = async (
    name,
    initiative,
    ac,
    type,
    conditions = []
  ) => {
    if (!isCreator) return;

    const newParticipant = {
      id: Date.now(),
      name,
      initiative: parseInt(initiative, 10),
      ac,
      type,
      conditions,
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

  const editParticipant = async (
    participantId,
    newName,
    newInitiative,
    newAC,
    newType,
    newConditions = []
  ) => {
    if (!isCreator) return;

    const updatedParticipants = encounter.participants
      .map((p) =>
        p.id === participantId
          ? {
              ...p,
              name: newName,
              initiative: parseInt(newInitiative, 10),
              ac: parseInt(newAC, 10),
              type: newType,
              conditions: newConditions,
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

  const updateDmNotes = async (newNotes) => {
    try {
      await updateDoc(doc(db, "encounters", id), {
        dmNotes: newNotes,
      });
    } catch (error) {
      console.error("Error updating DM notes:", error);
    }
  };

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
            dmNotes={encounter.dmNotes || ""}
            updateDmNotes={updateDmNotes}
            isCreator={isCreator}
          />
        </div>
      </div>
    </div>
  );
}

export default EncounterPage;

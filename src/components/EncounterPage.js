import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../App";
import AddParticipant from "./AddParticipant";
import InitiativeOrder from "./InitiativeOrder";

function EncounterPage() {
  const { id } = useParams();
  const [encounter, setEncounter] = useState(null);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);

  useEffect(() => {
    const fetchEncounter = async () => {
      const docRef = doc(db, "encounters", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setEncounter(docSnap.data());
      } else {
        console.error("No such encounter!");
      }
    };

    fetchEncounter();
  }, [id]);

  const addParticipant = async (name, initiative, ac) => {
    const newParticipant = {
      id: Date.now(),
      name,
      initiative: parseInt(initiative, 10),
      ac,
    };
    const updatedParticipants = [...encounter.participants, newParticipant].sort(
      (a, b) => b.initiative - a.initiative
    );

    setEncounter({ ...encounter, participants: updatedParticipants });

    await updateDoc(doc(db, "encounters", id), {
      participants: updatedParticipants,
    });
  };

  const editParticipant = async (participantId, newInitiative, newAC) => {
    const updatedParticipants = encounter.participants.map((p) =>
      p.id === participantId
        ? { ...p, initiative: newInitiative, ac: newAC }
        : p
    );

    setEncounter({ ...encounter, participants: updatedParticipants });

    await updateDoc(doc(db, "encounters", id), {
      participants: updatedParticipants,
    });
  };

  const deleteParticipant = async (participantId) => {
    const updatedParticipants = encounter.participants.filter(
      (p) => p.id !== participantId
    );

    setEncounter({ ...encounter, participants: updatedParticipants });

    await updateDoc(doc(db, "encounters", id), {
      participants: updatedParticipants,
    });
  };

  const nextTurn = () => {
    setCurrentTurnIndex((prev) => (prev + 1) % encounter.participants.length);
  };

  if (!encounter) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <h1>Encounter: {encounter.name}</h1>
      <div className="left-panel col-3">
        <h2>Add Participants</h2>
        <AddParticipant addParticipant={addParticipant} />
      </div>
      <div className="right-panel col">
        <InitiativeOrder
          participants={encounter.participants}
          currentTurnIndex={currentTurnIndex}
          nextTurn={nextTurn}
          editParticipant={editParticipant}
          deleteParticipant={deleteParticipant}
        />
      </div>
    </div>
  );
}

export default EncounterPage;

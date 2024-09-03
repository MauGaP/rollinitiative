import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import AllyIcon from "../assets/icons/ally.svg";
import EnemyIcon from "../assets/icons/enemy.svg";
import NeutralIcon from "../assets/icons/neutral.svg";
import PartyIcon from "../assets/icons/party.svg";
import ConditionModal from "./ConditionModal";
import EditParticipantModal from "./EditParticipantModal";

function InitiativeOrder({
  participants,
  currentTurnIndex,
  nextTurn,
  editParticipant,
  deleteParticipant,
  dmNotes,
  updateDmNotes,
  isCreator,
}) {
  const [editingParticipantId, setEditingParticipantId] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [notes, setNotes] = useState(dmNotes || "");

  useEffect(() => {
    setNotes(dmNotes);
  }, [dmNotes]);

  const handleBlur = () => {
    updateDmNotes(notes);
  };

  const startEditing = (participant) => {
    setEditingParticipantId(participant.id);
    setIsEditModalOpen(true);
  };

  const saveChanges = (name, initiative, ac, type, conditions) => {
    if (editingParticipantId) {
      editParticipant(
        editingParticipantId,
        name,
        initiative,
        ac,
        type,
        conditions
      );
    }
    setIsEditModalOpen(false);
  };

  const cancelEditing = () => {
    setEditingParticipantId(null);
    setIsEditModalOpen(false);
  };

  const handleConditionClick = (condition) => {
    setSelectedCondition(condition);
    setIsModalOpen(true);
  };

  const handleConditionDelete = (participantId, conditionToDelete) => {
    const participant = participants.find((p) => p.id === participantId);

    const updatedConditions = Array.isArray(participant.conditions)
      ? participant.conditions.filter(
          (condition) => condition !== conditionToDelete
        )
      : [];

    editParticipant(
      participantId,
      participant.name, 
      participant.initiative, 
      participant.ac, 
      participant.type, 
      updatedConditions
    );
  };

  const getIconByType = (type) => {
    switch (type) {
      case "Party":
        return <img src={PartyIcon} alt="Party" className="participant-icon" />;
      case "Enemy":
        return <img src={EnemyIcon} alt="Enemy" className="participant-icon" />;
      case "Ally":
        return <img src={AllyIcon} alt="Ally" className="participant-icon" />;
      case "Neutral":
        return (
          <img src={NeutralIcon} alt="Neutral" className="participant-icon" />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="initiative-header">
        <h2>Initiative Order</h2>
        {nextTurn && (
          <button onClick={nextTurn} className="btn btn-success">
            Next Turn
          </button>
        )}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: "20%" }}>Name</th>
            <th style={{ width: "20%" }}>Initiative</th>
            <th style={{ width: "20%" }}>AC</th>
            <th style={{ width: "20%" }}>Conditions</th>
            {isCreator && <th style={{ width: "20%" }}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {participants.map((participant, index) => (
            <tr
              key={participant.id}
              className={index === currentTurnIndex ? "current-turn" : ""}
            >
              <td>
                {getIconByType(participant.type)} {participant.name}
              </td>
              <td>{participant.initiative}</td>
              <td>{participant.ac}</td>
              <td>
                {Array.isArray(participant.conditions) &&
                  participant.conditions.map((condition, idx) => (
                    <Chip
                      key={idx}
                      onClick={() => handleConditionClick(condition)}
                      onDelete={
                        isCreator
                          ? () =>
                              handleConditionDelete(participant.id, condition)
                          : undefined
                      }
                      label={condition}
                      variant="outlined"
                      style={{ marginRight: "5px", marginBottom: "5px" }}
                    />
                  ))}
              </td>
              {isCreator && (
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => startEditing(participant)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteParticipant(participant.id)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {isCreator && (
        <div style={{ marginTop: "20px" }}>
          <h3>DM Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={handleBlur}
            className="form-control"
            rows="5"
            placeholder="Enter your notes here..."
          />
        </div>
      )}

      <EditParticipantModal
        open={isEditModalOpen}
        onClose={cancelEditing}
        onSave={saveChanges}
        participant={participants.find((p) => p.id === editingParticipantId)}
      />

      <ConditionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        conditionName={selectedCondition}
      />
    </div>
  );
}

export default InitiativeOrder;

import React, { useState } from "react";

function Participant({
  participant,
  isCurrent,
  deleteParticipant,
  editParticipant,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempInitiative, setTempInitiative] = useState(participant.initiative);
  const [tempAC, setTempAC] = useState(participant.ac);
  const [showAC, setShowAC] = useState(participant.showAC || true); // Default to true if not set

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = () => {
    editParticipant(participant.id, tempInitiative, tempAC, showAC); // Pass showAC when saving
    setIsEditing(false);
  };

  return (
    <tr className={isCurrent ? "current-turn" : ""}>
      <td>{participant.name}</td>
      <td>
        {isEditing ? (
          <input
            type="number"
            value={tempInitiative}
            onChange={(e) => setTempInitiative(e.target.value)}
            className="form-control"
          />
        ) : (
          participant.initiative
        )}
      </td>
      
      {/* Conditionally display AC based on showAC */}
      <td>
        {showAC ? (
          isEditing ? (
            <input
              type="number"
              value={tempAC}
              onChange={(e) => setTempAC(e.target.value)}
              className="form-control"
            />
          ) : (
            participant.ac
          )
        ) : (
          <span>Hidden</span> // Display a placeholder if AC is hidden
        )}
      </td>

      {/* Show toggle for showAC if editing */}
      {isEditing && (
        <td>
          <label>
            Show AC:
            <input
              type="checkbox"
              checked={showAC}
              onChange={(e) => setShowAC(e.target.checked)}
            />
          </label>
        </td>
      )}

      <td>
        {isEditing ? (
          <button onClick={handleSaveClick} className="btn btn-success btn-sm">
            Save
          </button>
        ) : (
          <button onClick={handleEditClick} className="btn btn-primary btn-sm">
            Edit
          </button>
        )}
        {deleteParticipant && !isEditing && (
          <button
            onClick={() => deleteParticipant(participant.id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  );
}

export default Participant;

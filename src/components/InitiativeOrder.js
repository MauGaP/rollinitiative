import React, { useState } from "react";

function InitiativeOrder({
  participants,
  currentTurnIndex,
  nextTurn,
  editParticipant,
  deleteParticipant,
}) {
  const [editingParticipantId, setEditingParticipantId] = useState(null);
  const [tempInitiative, setTempInitiative] = useState("");
  const [tempAC, setTempAC] = useState("");

  const startEditing = (participant) => {
    setEditingParticipantId(participant.id);
    setTempInitiative(participant.initiative);
    setTempAC(participant.ac);
  };

  const saveChanges = (id) => {
    editParticipant(id, tempInitiative, tempAC);
    setEditingParticipantId(null);
  };

  const cancelEditing = () => {
    setEditingParticipantId(null);
  };

  const showActions = editParticipant && deleteParticipant;
  const cellStyle = { height: "55px", verticalAlign: "middle" };

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
            <th style={{ width: showActions ? "25%" : "33%" }}>Name</th>
            <th style={{ width: showActions ? "25%" : "33%" }}>Initiative</th>
            <th style={{ width: showActions ? "25%" : "33%" }}>AC</th>
            {showActions && <th style={{ width: "25%" }}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {participants.map((participant, index) => (
            <tr
              key={participant.id}
              className={index === currentTurnIndex ? "table-primary" : ""}
            >
              <td style={cellStyle}>{participant.name}</td>
              <td style={cellStyle}>
                {editingParticipantId === participant.id ? (
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
              <td style={cellStyle}>
                {editingParticipantId === participant.id ? (
                  <input
                    type="number"
                    value={tempAC}
                    onChange={(e) => setTempAC(e.target.value)}
                    className="form-control"
                  />
                ) : (
                  participant.ac
                )}
              </td>
              {showActions && (
                <td style={cellStyle}>
                  {editingParticipantId === participant.id ? (
                    <>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => saveChanges(participant.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={cancelEditing}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InitiativeOrder;

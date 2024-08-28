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
    if (tempInitiative && tempAC) {
      editParticipant(id, tempInitiative, tempAC);
    }
    setEditingParticipantId(null);
  };

  const cancelEditing = () => {
    setEditingParticipantId(null);
  };

  const columnStyle = { width: "25%" };
  const cellStyle = { height: "55px", verticalAlign: "middle" };
  return (
    <div>
      <h2>Initiative Order</h2>
      <table className="table">
        <thead>
          <tr>
            <th style={columnStyle}>Name</th>
            <th style={columnStyle}>Initiative</th>
            <th style={columnStyle}>AC</th>
            <th style={columnStyle}>Actions</th>
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
                      className="btn btn-sm btn-secondary ms-2"
                      onClick={cancelEditing}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {editParticipant && (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => startEditing(participant)}
                      >
                        Edit
                      </button>
                    )}
                    {deleteParticipant && (
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => deleteParticipant(participant.id)}
                      >
                        Delete
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {nextTurn && (
        <button onClick={nextTurn} className="btn btn-success mt-3">
          Next Turn
        </button>
      )}
    </div>
  );
}

export default InitiativeOrder;

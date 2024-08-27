import React, { useState } from "react";

function InitiativeOrder({
  participants,
  currentTurnIndex,
  nextTurn,
  editParticipant,
  deleteParticipant,
}) {
  const [isEditing, setIsEditing] = useState(null);
  const [newInitiative, setNewInitiative] = useState("");
  const [newAc, setNewAc] = useState("");

  const handleEdit = (id) => {
    setIsEditing(id);
    const participant = participants.find((p) => p.id === id);
    setNewInitiative(participant.initiative);
    setNewAc(participant.ac);
  };

  const handleSave = (id) => {
    editParticipant(id, parseInt(newInitiative, 10), parseInt(newAc, 10));
    setIsEditing(null);
  };

  const columnStyle = { width: "25%" };
  const cellStyle = { height: "40px", verticalAlign: "middle" };

  return (
    <div>
      <h2>Initiative Order</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th style={columnStyle}>Initiative</th>
            <th style={columnStyle}>AC</th>
            <th>Actions</th>
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
                {isEditing === participant.id ? (
                  <input
                    type="number"
                    value={newInitiative}
                    onChange={(e) => setNewInitiative(e.target.value)}
                    className="form-control"
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  participant.initiative
                )}
              </td>
              <td style={cellStyle}>
                {isEditing === participant.id ? (
                  <input
                    type="number"
                    value={newAc}
                    onChange={(e) => setNewAc(e.target.value)}
                    className="form-control"
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  participant.ac
                )}
              </td>
              <td style={cellStyle}>
                {isEditing === participant.id ? (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleSave(participant.id)}
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleEdit(participant.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger ms-2"
                      onClick={() => deleteParticipant(participant.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={nextTurn} className="btn btn-success mt-3">
        Next Turn
      </button>
    </div>
  );
}

export default InitiativeOrder;

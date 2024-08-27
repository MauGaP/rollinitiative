import React, { useState } from 'react';

function Participant({ participant, isCurrent, deleteParticipant, editParticipant }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newInitiative, setNewInitiative] = useState(participant.initiative);

  const handleEdit = () => {
    if (isEditing) {
      editParticipant(participant.id, newInitiative);
    }
    setIsEditing(!isEditing);
  };

  return (
    <tr className={isCurrent ? 'current-turn' : ''}>
      <td>{participant.name}</td>
      <td>
        {isEditing ? (
          <input
            type="number"
            value={newInitiative}
            onChange={(e) => setNewInitiative(e.target.value)}
          />
        ) : (
          participant.initiative
        )}
      </td>
      <td>
        <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        <button onClick={() => deleteParticipant(participant.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default Participant;

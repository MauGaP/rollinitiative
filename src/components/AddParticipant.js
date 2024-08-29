import React, { useState } from "react";

function AddParticipant({ addParticipant }) {
  const [name, setName] = useState("");
  const [initiative, setInitiative] = useState("");
  const [ac, setAc] = useState("");
  const [type, setType] = useState("Party"); // Default classification

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && initiative && ac) {
      addParticipant(name, initiative, ac, type);
      setName("");
      setInitiative("");
      setAc("");
      setType("Party"); // Reset to default after adding
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
      <div className="form-group">
        <label htmlFor="nameInput">Name</label>
        <input
          type="text"
          className="form-control"
          id="nameInput"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="initiativeInput">Initiative</label>
        <input
          type="number"
          className="form-control"
          id="initiativeInput"
          placeholder="Enter initiative"
          value={initiative}
          onChange={(e) => setInitiative(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="acInput">Armor Class</label>
        <input
          type="number"
          className="form-control"
          id="acInput"
          placeholder="Enter Armor Class"
          value={ac}
          onChange={(e) => setAc(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Type/Team</label>
        <div className="d-flex gap-3">
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="partyRadio"
              value="Party"
              checked={type === "Party"}
              onChange={(e) => setType(e.target.value)}
            />
            <label className="form-check-label" htmlFor="partyRadio">
              Party
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="enemyRadio"
              value="Enemy"
              checked={type === "Enemy"}
              onChange={(e) => setType(e.target.value)}
            />
            <label className="form-check-label" htmlFor="enemyRadio">
              Enemy
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="allyRadio"
              value="Ally"
              checked={type === "Ally"}
              onChange={(e) => setType(e.target.value)}
            />
            <label className="form-check-label" htmlFor="allyRadio">
              Ally
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="neutralRadio"
              value="Neutral"
              checked={type === "Neutral"}
              onChange={(e) => setType(e.target.value)}
            />
            <label className="form-check-label" htmlFor="neutralRadio">
              Neutral
            </label>
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
}

export default AddParticipant;

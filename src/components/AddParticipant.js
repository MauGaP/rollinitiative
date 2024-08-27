import React, { useState } from "react";

function AddParticipant({ addParticipant }) {
  const [name, setName] = useState("");
  const [initiative, setInitiative] = useState("");
  const [ac, setAc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && initiative && ac) {
      addParticipant(name, initiative, ac);
      setName("");
      setInitiative("");
      setAc("");
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
          type="text"
          className="form-control"
          id="acInput"
          placeholder="Enter Armor Class"
          value={ac}
          onChange={(e) => setAc(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
}

export default AddParticipant;

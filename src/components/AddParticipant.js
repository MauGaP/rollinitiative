import React, { useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { conditions } from "../utils/conditions";
import { typesList } from "../utils/types";

const CONDITIONS = conditions.map((condition) => condition.name);
const TYPES = typesList;

function AddParticipant({ addParticipant }) {
  const [name, setName] = useState("");
  const [initiative, setInitiative] = useState("");
  const [ac, setAc] = useState("");
  const [type, setType] = useState("Party");
  const [selectedConditions, setSelectedConditions] = useState([]);

  const handleConditionChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedConditions(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && initiative && ac) {
      addParticipant(name, initiative, ac, type, selectedConditions);
      setName("");
      setInitiative("");
      setAc("");
      setType("Party");
      setSelectedConditions([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
      <FormControl fullWidth>
        <InputLabel>Type / Team</InputLabel>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          input={<OutlinedInput label="Type / Team" />}
        >
          {TYPES.map((typeOption) => (
            <MenuItem key={typeOption} value={typeOption}>
              {typeOption}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />

      <TextField
        label="Initiative"
        type="number"
        variant="outlined"
        value={initiative}
        onChange={(e) => setInitiative(e.target.value)}
        fullWidth
      />

      <TextField
        label="Armor Class"
        type="number"
        variant="outlined"
        value={ac}
        onChange={(e) => setAc(e.target.value)}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel>Conditions (optional)</InputLabel>
        <Select
          multiple
          value={selectedConditions}
          onChange={handleConditionChange}
          input={<OutlinedInput label="Conditions (optional)" />}
          renderValue={(selected) => selected.join(", ")}
        >
          {CONDITIONS.map((condition) => (
            <MenuItem key={condition} value={condition}>
              <Checkbox checked={selectedConditions.indexOf(condition) > -1} />
              <ListItemText primary={condition} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
  );
}

export default AddParticipant;

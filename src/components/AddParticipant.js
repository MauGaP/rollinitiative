import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
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
  const [showAC, setShowAC] = useState(true); // Default showAC to true

  // Handle the condition of switching showAC based on the type
  useEffect(() => {
    if (type === "Party") {
      setShowAC(true);  // Default to true for 'Party'
    } else {
      setShowAC(false); // Default to false for others
    }
  }, [type]);

  const handleConditionChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedConditions(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && initiative && ac) {
      addParticipant(name, initiative, ac, type, selectedConditions, showAC);
      setName("");
      setInitiative("");
      setAc("");
      setType("Party");
      setSelectedConditions([]);
      setShowAC(true); // Reset to default
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

      {/* Armor Class and Show Switch in the same row */}
      <Box display={"flex"} alignItems={"center"} gap={1}>
        <TextField
          label="Armor Class"
          type="number"
          variant="outlined"
          value={ac}
          onChange={(e) => setAc(e.target.value)}
          fullWidth
        />
        <FormControlLabel
          control={
            <Switch
              checked={showAC}
              onChange={(e) => setShowAC(e.target.checked)}
            />
          }
          label="Show"
        />
      </Box>

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

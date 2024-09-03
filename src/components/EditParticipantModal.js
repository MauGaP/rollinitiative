import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { conditions } from "../utils/conditions";
import { typesList } from "../utils/types";

const TYPES = typesList;
const CONDITIONS = conditions.map((condition) => condition.name);

function EditParticipantModal({ open, onClose, onSave, participant }) {
  const [tempName, setTempName] = useState("");
  const [tempInitiative, setTempInitiative] = useState("");
  const [tempAC, setTempAC] = useState("");
  const [tempType, setTempType] = useState("Party");
  const [selectedConditions, setSelectedConditions] = useState([]);

  useEffect(() => {
    if (participant) {
      setTempName(participant.name);
      setTempInitiative(participant.initiative);
      setTempAC(participant.ac);
      setTempType(participant.type);
      setSelectedConditions(
        Array.isArray(participant.conditions) ? participant.conditions : []
      );
    }
  }, [participant]);

  const handleConditionChange = (condition) => {
    setSelectedConditions((prev) => {
      if (prev.includes(condition)) {
        return prev.filter((c) => c !== condition);
      } else {
        return [...prev, condition];
      }
    });
  };

  const handleSave = () => {
    onSave(tempName, tempInitiative, tempAC, tempType, selectedConditions);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Participant</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
        />
        <TextField
          label="Initiative"
          type="number"
          fullWidth
          margin="normal"
          value={tempInitiative}
          onChange={(e) => setTempInitiative(e.target.value)}
        />
        <TextField
          label="Armor Class"
          type="number"
          fullWidth
          margin="normal"
          value={tempAC}
          onChange={(e) => setTempAC(e.target.value)}
        />
        <TextField
          label="Type / Team"
          select
          fullWidth
          margin="normal"
          value={tempType}
          onChange={(e) => setTempType(e.target.value)}
        >
          {TYPES.map((typeOption) => (
            <MenuItem key={typeOption} value={typeOption}>
              {typeOption}
            </MenuItem>
          ))}
        </TextField>
        <div style={{ marginTop: "20px" }}>
          <label>Conditions:</label>
          <div>
            {CONDITIONS.map((condition) => (
              <FormControlLabel
                key={condition}
                control={
                  <Checkbox
                    checked={selectedConditions.includes(condition)}
                    onChange={() => handleConditionChange(condition)}
                  />
                }
                label={condition}
              />
            ))}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditParticipantModal;

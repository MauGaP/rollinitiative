import { Box, Switch } from "@mui/material";
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
  const [showAC, setShowAC] = useState(true); // Default showAC to true
  const [isDowned, setIsDowned] = useState(false);

  useEffect(() => {
    if (participant) {
      setTempName(participant.name);
      setTempInitiative(participant.initiative);
      setTempAC(participant.ac);
      setTempType(participant.type);
      setSelectedConditions(
        Array.isArray(participant.conditions) ? participant.conditions : []
      );
      setShowAC(participant.showAC !== undefined ? participant.showAC : true); // Ensure showAC has a default value
      setIsDowned(participant.isDowned || false);
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
    onSave(
      tempName,
      tempInitiative,
      tempAC,
      tempType,
      selectedConditions,
      showAC,
      isDowned
    );
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

        <Box display={"flex"} alignItems={"center"} gap={1}>
          <TextField
            label="Armor Class"
            type="number"
            fullWidth
            margin="normal"
            value={tempAC}
            onChange={(e) => setTempAC(e.target.value)}
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
        <div style={{ marginTop: "10px" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isDowned}
                onChange={(e) => setIsDowned(e.target.checked)}
                icon={<img src="/assets/icons/heart.svg" alt="Healthy" style={{ width: 24, height: 24, verticalAlign: 'middle' }} />}
                checkedIcon={<img src="/assets/icons/skull.svg" alt="Downed" style={{ width: 24, height: 24, verticalAlign: 'middle' }} />}
              />
            }
            label={
              isDowned
                ? (<span> Downed (skip in order)</span>)
                : (<span> Healthy (in initiative)</span>)
            }
          />
          <div style={{ fontSize: '0.9em', color: '#666', marginLeft: 32 }}>
            {isDowned
              ? 'This participant will be skipped in the initiative order and shown as downed.'
              : 'This participant will act normally in the initiative order.'}
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

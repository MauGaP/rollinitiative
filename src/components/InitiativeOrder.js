import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import AllyIcon from "../assets/icons/ally.svg";
import EnemyIcon from "../assets/icons/enemy.svg";
import NeutralIcon from "../assets/icons/neutral.svg";
import PartyIcon from "../assets/icons/party.svg";
import ConditionModal from "./ConditionModal";
import EditParticipantModal from "./EditParticipantModal";

function InitiativeOrder({
  participants,
  currentTurnIndex,
  nextTurn,
  editParticipant,
  deleteParticipant,
  dmNotes,
  updateDmNotes,
  isCreator,
}) {
  const [editingParticipantId, setEditingParticipantId] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [notes, setNotes] = useState(dmNotes || "");

  useEffect(() => {
    setNotes(dmNotes);
  }, [dmNotes]);

  const handleBlur = () => {
    updateDmNotes(notes);
  };

  const startEditing = (participant) => {
    setEditingParticipantId(participant.id);
    setIsEditModalOpen(true);
  };

  const saveChanges = (name, initiative, ac, type, conditions) => {
    if (editingParticipantId) {
      editParticipant(
        editingParticipantId,
        name,
        initiative,
        ac,
        type,
        conditions
      );
    }
    setIsEditModalOpen(false);
  };

  const cancelEditing = () => {
    setEditingParticipantId(null);
    setIsEditModalOpen(false);
  };

  const handleConditionClick = (condition) => {
    setSelectedCondition(condition);
    setIsModalOpen(true);
  };

  const handleConditionDelete = (participantId, conditionToDelete) => {
    const participant = participants.find((p) => p.id === participantId);

    const updatedConditions = Array.isArray(participant.conditions)
      ? participant.conditions.filter(
          (condition) => condition !== conditionToDelete
        )
      : [];

    editParticipant(
      participantId,
      participant.name,
      participant.initiative,
      participant.ac,
      participant.type,
      updatedConditions
    );
  };

  const getIconByType = (type) => {
    switch (type) {
      case "Party":
        return <img src={PartyIcon} alt="Party" className="participant-icon" />;
      case "Enemy":
        return <img src={EnemyIcon} alt="Enemy" className="participant-icon" />;
      case "Ally":
        return <img src={AllyIcon} alt="Ally" className="participant-icon" />;
      case "Neutral":
        return (
          <img src={NeutralIcon} alt="Neutral" className="participant-icon" />
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" component="h2">
          Initiative Order
        </Typography>
        {nextTurn && (
          <Button variant="contained" color="success" onClick={nextTurn}>
            Next Turn
          </Button>
        )}
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "20%" }}>Name</TableCell>
              <TableCell style={{ width: "20%" }}>Initiative</TableCell>
              <TableCell style={{ width: "20%" }}>AC</TableCell>
              <TableCell style={{ width: "20%" }}>Conditions</TableCell>
              {isCreator && (
                <TableCell style={{ width: "20%" }}>Actions</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.map((participant, index) => (
              <TableRow
                key={participant.id}
                className={index === currentTurnIndex ? "current-turn" : ""}
              >
                <TableCell>
                  {getIconByType(participant.type)} {participant.name}
                </TableCell>
                <TableCell>{participant.initiative}</TableCell>
                <TableCell>{participant.ac}</TableCell>
                <TableCell>
                  {Array.isArray(participant.conditions) &&
                    participant.conditions.map((condition, idx) => (
                      <Chip
                        key={idx}
                        onClick={() => handleConditionClick(condition)}
                        onDelete={
                          isCreator
                            ? () =>
                                handleConditionDelete(participant.id, condition)
                            : undefined
                        }
                        label={condition}
                        variant="outlined"
                        sx={{ marginRight: 1, marginBottom: 1 }}
                      />
                    ))}
                </TableCell>
                {isCreator && (
                  <TableCell>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => startEditing(participant)}
                      sx={{ marginRight: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => deleteParticipant(participant.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isCreator && (
        <Box mt={3}>
          <Typography variant="h5" component="h3">
            DM Notes
          </Typography>
          <TextField
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={handleBlur}
            multiline
            rows={5}
            fullWidth
            variant="outlined"
            placeholder="Enter your notes here..."
            sx={{ mt: 2 }}
          />
        </Box>
      )}

      <EditParticipantModal
        open={isEditModalOpen}
        onClose={cancelEditing}
        onSave={saveChanges}
        participant={participants.find((p) => p.id === editingParticipantId)}
      />

      <ConditionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        conditionName={selectedCondition}
      />
    </Box>
  );
}

export default InitiativeOrder;

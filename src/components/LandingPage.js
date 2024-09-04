import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../App";

function LandingPage() {
  const [encounterName, setEncounterName] = useState("");
  const [encounterId, setEncounterId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createEncounter = async () => {
    if (encounterName.trim() === "") {
      setError("Encounter name must have at least 1 character.");
      return;
    }

    setLoading(true);
    const sessionId =
      sessionStorage.getItem("sessionId") || Date.now().toString();
    sessionStorage.setItem("sessionId", sessionId);

    try {
      const docRef = await addDoc(collection(db, "encounters"), {
        name: encounterName,
        participants: [],
        createdBy: sessionId,
      });
      navigate(`/encounter/${docRef.id}`);
    } catch (e) {
      console.error("Error adding document: ", e);
      setError("Failed to create the encounter. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const joinEncounter = async () => {
    if (encounterId.trim() === "") {
      setError("Please enter a valid encounter ID.");
      return;
    }

    setLoading(true);
    try {
      const docRef = doc(db, "encounters", encounterId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        navigate(`/encounter/${encounterId}`);
      } else {
        setError("No such encounter exists. Please check the ID.");
      }
    } catch (e) {
      console.error("Error joining encounter: ", e);
      setError("Failed to join the encounter. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        DnD Encounter Manager
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Create a New Encounter</Typography>
        <TextField
          label="Enter encounter name"
          variant="outlined"
          fullWidth
          value={encounterName}
          onChange={(e) => setEncounterName(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={createEncounter}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Create Encounter"}
        </Button>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Box>
        <Typography variant="h6">Join an Existing Encounter</Typography>
        <TextField
          label="Enter encounter ID"
          variant="outlined"
          fullWidth
          value={encounterId}
          onChange={(e) => setEncounterId(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={joinEncounter}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Join Encounter"}
        </Button>
      </Box>
    </Container>
  );
}

export default LandingPage;

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
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
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect if the screen is mobile

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
    <Container maxWidth="sm" sx={{ mt: isMobile ? 3 : 5, px: isMobile ? 2 : 0 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      <Box sx={{ mb: 3 }}>
        <Typography variant={isMobile ? "h5" : "h4"}>
          Create a New Encounter
        </Typography>
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
        <Typography variant={isMobile ? "h6" : "h5"}>
          Join an Existing Encounter
        </Typography>
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

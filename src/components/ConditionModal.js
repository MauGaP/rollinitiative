import { Dialog, DialogTitle } from "@mui/material";
import React from "react";
import { conditions } from "../utils/conditions";

const ConditionModal = ({ conditionName, open, onClose }) => {
  const condition = conditions.find((c) => c.name === conditionName);

  if (!condition) return null;

  const { name, description, image } = condition;

  return (
    <Dialog classname="modal-content" open={open} onClose={onClose}>
      <div className="modal-content">
        <DialogTitle>{name}</DialogTitle>
        {image && (
          <img
            className="condition-image"
            src={image}
            alt={name}
            style={{ alignSelf: "center", width: "70%", marginBottom: "20px" }}
          />
        )}
        <ul>
          {description.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      </div>
    </Dialog>
  );
};

export default ConditionModal;

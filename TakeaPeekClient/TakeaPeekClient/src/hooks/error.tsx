import React from "react";
import { Box, Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

interface ErrorProps {
  error: string | null; // משתנה אחד שיכול להיות null אם אין שגיאה
  onClose: () => void; // פונקציה לסגירת השגיאה
}

const Error: React.FC<ErrorProps> = ({ error, onClose }) => {
  return (
    <Box sx={{ width: "100%", position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", maxWidth: 400, zIndex: 1000 }}>
      {error && (
        <Collapse in={true}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Alert
              severity="error"
              sx={{
                mb: 2,
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: "rgba(255, 0, 0, 0.1)",
                color: "#d32f2f",
              }}
              action={
                <IconButton size="small" onClick={onClose}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {error}
            </Alert>
          </motion.div>
        </Collapse>
      )}
    </Box>
  );
};

export default Error;

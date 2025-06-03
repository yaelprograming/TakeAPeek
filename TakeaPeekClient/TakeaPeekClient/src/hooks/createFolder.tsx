import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add'

const CreateFolder: React.FC = () => {
  const [folderName, setFolderName] = useState<string>(''); // שם התיקיה
  const [openDialog, setOpenDialog] = useState<boolean>(false); // האם הדיאלוג פתוח

  // פונקציה לפתיחת הדיאלוג
  const handleClick = () => {
    setOpenDialog(true);
  };

  // פונקציה לסגירת הדיאלוג
  const handleClose = () => {
    setOpenDialog(false);
    setFolderName(''); // מנקה את שם התיקיה אחרי סגירת הדיאלוג
  };

  // פונקציה לשליחת הנתונים לשרת
  const handleCreateFolder = async () => {
    if (folderName.trim() === '') {
      alert('אנא הזן שם לתיקיה');
      return;
    }

    try {
      await axios.post('localhost:5282/folders', { name: folderName });
      alert('התיקיה נוצרה בהצלחה!');
      handleClose();
    } catch (error) {
      alert('שגיאה ביצירת התיקיה');
      console.error(error);
    }
  };

  return (
    <div>
       <IconButton color="primary" onClick={handleClick}>
            <AddIcon />
            new folder
        </IconButton>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>create new folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="folderName"
            label="file name"
            type="text"
            fullWidth
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            cancel
          </Button>
          <Button onClick={handleCreateFolder} color="primary">
            create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateFolder;
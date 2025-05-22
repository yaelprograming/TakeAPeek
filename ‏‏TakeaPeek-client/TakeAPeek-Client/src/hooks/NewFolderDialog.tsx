// components/NewFolderDialog.tsx

import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
} from '@mui/material';

interface NewFolderDialogProps {
    open: boolean;
    onClose: () => void;
    onCreate: (folderName: string) => void;
}

const NewFolderDialog: React.FC<NewFolderDialogProps> = ({ open, onClose, onCreate }) => {
    const [folderName, setFolderName] = useState('');

    const handleCreate = () => {
        if (folderName.trim() !== '') {
            onCreate(folderName.trim());
            setFolderName('');
            onClose();
        }
    };

    const handleClose = () => {
        setFolderName('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>צור תיקייה חדשה</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    fullWidth
                    label="שם התיקייה"
                    variant="outlined"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">ביטול</Button>
                <Button onClick={handleCreate} color="primary" variant="contained">צור</Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewFolderDialog;

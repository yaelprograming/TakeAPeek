
import React, { useState, ChangeEvent } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from '@mui/material';

interface FileUploadProps {
    open: boolean;
    onClose: () => void;
    onUpload: (uploadData: { files: File[]; folderId: string; ownerId: number }) => Promise<void>;
    folderId: string;
    ownerId: number; // קבלת ownerId
}

const FileUpload: React.FC<FileUploadProps> = ({ open, onClose, onUpload, folderId,ownerId  }) => {
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(Array.from(event.target.files));
        }
    };


    const handleUploadClick = async () => {
        console.log("handleUploadClick")
        if (files.length > 0) {
            await onUpload({ files, folderId, ownerId }); // העברת ownerId
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>העלאת קבצים</DialogTitle>
            <DialogContent>
                <TextField
                    type="file"
                    inputProps={{ accept: "image/*,video/*", multiple: true }}
                    onChange={handleFileChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    ביטול
                </Button>
                <Button onClick={handleUploadClick} color="primary">
                    העלאה
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FileUpload;
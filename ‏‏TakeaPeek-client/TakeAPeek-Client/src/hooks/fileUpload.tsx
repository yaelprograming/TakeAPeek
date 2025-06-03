// import React, { useEffect, useState } from "react";
// import { Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     Select,
//     MenuItem,
//     Typography,
//     List,
//     ListItem,
//     ListItemText,
//     TextField,
//     LinearProgress
// } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import axios from "axios";
// import { MyFile, MyFolder } from "../types/types";
// import CreateFolder from "./createFolder";

// interface FileUploadProps {
//     onUpload: (files: MyFile[], folderId: string, setProgress: (progress: number) => void) => Promise<void>;
// }

// const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
//     const [open, setOpen] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [files, setFiles] = useState<MyFile[]>([]);
//     const [selectedFolder, setSelectedFolder] = useState("");
//     const [folders, setFolders] = useState<MyFolder[]>([]);
//     const url = "http://localhost:5282/";

//     const fetchData = async () => {
//         try {
//             const res = await axios.get(url + "folders");
//             setFolders(res.data);
//         } catch (error) {
//             console.error("Error fetching folders:", error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const selectedFiles: MyFile[] = event.target.files ? Array.from(event.target.files) : [];
//         setFiles(selectedFiles);
//     };

//     const handleUpload = async () => {
//         if (!files.length || !selectedFolder) {
//             console.warn("❌ No files selected or folder not chosen!");
//             return;
//         }
//         setLoading(true);
//         setUploadProgress(0);

//         try {
//             await onUpload(files, selectedFolder, setUploadProgress);
//             console.log("✅ Upload successful!");
//         } catch (error) {
//             console.error("❌ Upload failed", error);
//         } finally {
//             setLoading(false);
//             setOpen(false);
//         }
//     };

//     return (
//         <>
//             <Button
//                 variant="contained"
//                 color="primary"
//                 startIcon={<CloudUploadIcon />}
//                 onClick={() => setOpen(true)}
//             >
//                 Upload
//             </Button>

//             <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
//                 <DialogTitle>Upload to FrameIt!</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         type="file"
//                         inputProps={{ accept: "image/*,video/*", multiple: true }}
//                         onChange={handleFileChange}
//                         fullWidth
//                     />

//                     <Typography variant="h6" color="primary" sx={{ mt: 4 }}>
//                         Upload to existing folder or create new
//                     </Typography>

//                     <Select
//                         value={selectedFolder}
//                         onChange={(e) => setSelectedFolder(e.target.value)}
//                         fullWidth
//                         sx={{ mt: 2 }}
//                     >
//                         {folders.map((folder) => (
//                             <MenuItem key={folder.id} value={folder.id}>
//                                 {folder.name}
//                             </MenuItem>
//                         ))}
//                     </Select>

//                     <CreateFolder />

//                     <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
//                         Selected items:
//                     </Typography>
//                     <List>
//                         {files.map((file, index) => (
//                             <ListItem key={index}>
//                                 <ListItemText
//                                     primary={file.name}
//                                     secondary={`Size: ${(file.size / 1024).toFixed(2)} KB`}
//                                 />
//                             </ListItem>
//                         ))}
//                     </List>
                    
//                     {loading && (
//                         <>
//                             <Typography sx={{ mt: 2 }}>Uploading... {uploadProgress}%</Typography>
//                             <LinearProgress variant="determinate" value={uploadProgress} />
//                         </>
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpen(false)} color="secondary">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleUpload} color="primary" disabled={loading}>
//                         Upload
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </>
//     );
// };
// export default FileUpload;

//שלי
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
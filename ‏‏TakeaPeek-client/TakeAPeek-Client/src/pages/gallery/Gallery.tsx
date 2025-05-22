
import { useEffect, useState } from 'react';
import {
    Box,
    Breadcrumbs,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Link,
    CircularProgress,
    Typography,
    InputAdornment,
    TextField,
    Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import FolderIcon from '@mui/icons-material/Folder';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { MyFile, MyFolder } from '../../types/types';
import { downloadFile } from '../../hooks/Download';
import FileUpload from '../../hooks/fileUpload';
import NewFolderDialog from '../../hooks/NewFolderDialog';
import AiButton from '../../components/ai/aiButton';

const API_BASE_URL = 'http://localhost:5293'; // עדכן לכתובת המתאימה שלך
// export const downloadFile = async (fileId: string, fileName: string) => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/files/${fileId}`, {
//             responseType: 'blob', // חשוב כדי לקבל את הקובץ כ-blob
//         });
//         saveAs(response.data, fileName); // שמירת הקובץ
//     } catch (error) {
//         console.error('Error downloading file:', error);
//     }
//};
export default function Gallery() {
    const [files, setFiles] = useState<MyFile[]>([]);
    const [folders, setFolders] = useState<MyFolder[]>([]);
    const [breadcrumb, setBreadcrumb] = useState<{ id: string; name: string }[]>([]);
    const [currentFolder, setCurrentFolder] = useState<string | null>(null); // הגדרת הסוג כ-string | null
    const [loading, setLoading] = useState(true);
    //חיפוש תיקייה וקבצים
    const [searchTerm, setSearchTerm] = useState('');
    const [openUpload, setOpenUpload] = useState(false);
//הוספת תיקיה
const [newFolderName, setNewFolderName] = useState('');
const [openNewFolderDialog, setOpenNewFolderDialog] = useState(false);


    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
//העלאה שלי
// const handleUpload = async (files: MyFile[]) => {
//     try {
//         await axios.post(`${API_BASE_URL}/files`, files, {
//             params: { folderId: currentFolder || '0' },
//         });
//         fetchData(currentFolder); // רענון הגלריה לאחר העלאה
//     } catch (error) {
//         console.error('Error uploading files:', error);
//     }
// };
const ownerId = 1; // או קבל את ownerId ממנגנון האימות שלך
// const handleUpload = async (files: MyFile[]) => {
//     try {
//         const formData = new FormData();
//         files.forEach(file => formData.append('files', file));
//         formData.append('OwnerId', ownerId.toString()); // הוספת ownerId ל-form data
//         await axios.post(`${API_BASE_URL}/files?folderId=${currentFolder || '0'}`, formData, {
//             headers: { 'Content-Type': 'multipart/form-data' }, // הגדרת סוג המדיה
//         });
//         fetchData(currentFolder);
//     } catch (error) {
//         console.error('Error uploading files:', error);
//     }
// };

const handleUpload = async (uploadedFiles: File[]) => {//???? בעיקרון myFile
    try {
        const formData = new FormData();

        // Append each file to the FormData object
        uploadedFiles.forEach(file => formData.append('files', file));

        // Append OwnerId and FolderId to the form data (no need for query parameters)
        formData.append('OwnerId', ownerId.toString());
        formData.append('FolderId', currentFolder || '0'); // Use currentFolder directly

        await axios.post(`${API_BASE_URL}/files`, formData, {  // Remove the query parameter
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        fetchData(currentFolder);
    } catch (error) {
        console.error('Error uploading files:', error);
    }
};


//העלאה שלי
    // סינון התיקיות והקבצים לפי החיפוש
    const filteredFolders = folders.filter((folder) =>
        folder?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredFiles = files.filter((file) =>
        file?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
   // חיפוש תיקייה וקבצים
    const deleteFileOrFolder = async (fileId: string, type: string) => {
        console.log('Deleting file or folder:', fileId, type);
        console.log(`delete: ${API_BASE_URL}/${type}/${fileId}`);
        try {
            await axios.delete(`${API_BASE_URL}/${type}/${fileId}`);

            if (type === 'folders') {
                setFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== fileId));
            } else if (type === 'files') {
                setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
            }

            fetchData(null);
        } catch (error) {
            console.error('Error deleting file or folder:', error);
        }
    };

    // הוספת פונקציה להורדת קובץ מ-S3
const downloadFileFromS3 = (fileKey: string, fileName: string) => {
    const imageUrl = `https://664133766426takeapeek.s3.eu-north-1.amazonaws.com/${fileKey}`;
    const a = document.createElement("a");
    a.href = imageUrl; // ה-URL של הקובץ ב-S3
    a.download = fileName; // שם הקובץ ברירת מחדל להורדה
    a.click(); // מבצע את ההורדה
};

const downloadFolder = async (folderId: string, folderName: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/folders/${folderId}/download`, {
        method: "GET",
      });
  
      if (!response.ok) throw new Error("Download failed");
  
      const blob = await response.blob();
  
      // יצירת לינק זמני להורדה
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${folderName}.zip`; // שם הקובץ שיהיה בשמירה
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading folder:", error);
      alert("התרחשה שגיאה בהורדת התיקייה");
    }
  };
  
  //הוספת תיקיה
  const handleCreateFolder = async (folderName: string) => {
    try {
        const folderData = {
            Name: folderName,
            ParentFolderId: currentFolder || null,  // אם יש תיקיית אב, נעביר את ה-ID שלה
            OwnerId: ownerId,
        };
        const response = await axios.post(`${API_BASE_URL}/folders`, folderData);
        fetchData(currentFolder); // עדכון התצוגה לאחר יצירת תיקיה חדשה
    } catch (error) {
        console.error('Error creating folder:', error);
    }
};

    useEffect(() => {
        fetchData(currentFolder);
    }, [currentFolder]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/folders`)
            .then(response => {
                console.log(response.data);

            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        console.log('Files updated:', files);
    }, [files]);
    
    const fetchData = async (folderId: string | null = '0') => {
        setLoading(true);
        try {
            console.log('Fetching data for folder:', folderId);
            const url = folderId
                ? `${API_BASE_URL}/folders/${folderId}/contents`
                : `${API_BASE_URL}/folders/0/contents`;
            console.log('Fetching from URL:', url); 
            
            const { data } = await axios.get(url);
            console.log('now ! from server: !!!Data received:', data); 
            console.log('data folsers: ',data.folders)
            console.log('data fikes: ',data.files)
           
            setFolders(data.folders?.filter(folder => !folder.isDeleted) || []);
            
            console.log('Data files before setting:', data.files);
            setFiles(data.files?.filter(file=>!file.isDeleted)); // פשוט להגדיר את הקבצים ישירות


            // עדכון Breadcrumbs
            const breadcrumbRes = await axios.get(folderId ? `${API_BASE_URL}/folders/${folderId}/breadcrumb` : `${API_BASE_URL}/folders/0/breadcrumb`);
            setBreadcrumb(breadcrumbRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };
    
    return (
        <Box sx={{ padding: 4, backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
            {/* כותרת */}
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                גלריה
            </Typography>
            {/* חיפוש תיקייה וקבצים */}
            <Box sx={{ marginBottom: 3 }}>
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="חפש לפי שם קובץ או תיקייה"
                    value={searchTerm}
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        backgroundColor: '#fff',
                        borderRadius: 2,
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                />
            </Box>
            {/* חיפוש תיקייה וקבצים */}
            
            {/* <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenUpload(true)} // פתיחת דיאלוג העלאה
            >
                העלאה
            </Button>
            <FileUpload
                open={openUpload}
                onClose={() => setOpenUpload(false)}
                onUpload={handleUpload}
                folderId={currentFolder || '0'} // העברת folderId
            /> */}

            <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
                <Link
                    color={currentFolder === null ? 'textPrimary' : 'inherit'}
                    onClick={() => setCurrentFolder(null)} // חזרה לתיקיית השורש
                    sx={{ cursor: 'pointer', fontSize: '1rem' }}
                >
                    Gallery
                </Link>

                {breadcrumb.map((folder, index) => (
                    <Link
                        key={folder.id}
                        color={index === breadcrumb.length - 1 ? 'textPrimary' : 'inherit'}
                        onClick={() => setCurrentFolder(folder.id)}
                        sx={{ cursor: 'pointer', fontSize: '1rem' }}
                    >
                        {folder.name}
                    </Link>
                ))}
            </Breadcrumbs>

            {/* תוכן */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress />
                </Box>
            ) : (

                <ImageList variant="masonry" cols={3} gap={16}>
                    {/* תיקיות */}
                    {filteredFolders.map((folder) => (
                        <ImageListItem
                            key={folder.id}
                            onClick={() => setCurrentFolder(folder.id)}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: '#fff',
                                borderRadius: 2,
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                padding: 2,
                                '&:hover': { boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' },
                            }}
                        >
                            <FolderIcon sx={{ fontSize: 60, color: '#f1c40f', marginBottom: 1 }} />
                            <Typography variant="subtitle1" align="center">
                                {folder.name}
                            </Typography>
                            {/* כפתורים מתחת לתיקייה */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: 1,
                                    marginTop: 1,
                                }}
                            >
                                <IconButton sx={{ color: '#1976d2' }}
onClick={() => downloadFolder(folder.id, folder.name)}
                                >
                                    <DownloadIcon />
                                </IconButton>
                                <IconButton sx={{ color: '#1976d2' }}>
                                    <ShareIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => deleteFileOrFolder(folder.id, "folders")}
                                    sx={{ color: '#d32f2f' }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                           
                        </ImageListItem>
                
                    
                    ))}

                    {/* קבצים */}
         
                    {files.map((file) => {
                        const imageUrl = `https://664133766426takeapeek.s3.eu-north-1.amazonaws.com/${file.s3Key}`;
                        console.log("Image URL:", imageUrl); // הוספת לוג
                        return file.s3Key ? (
                        <ImageListItem
                            key={file.id}
                            sx={{
                                backgroundColor: '#fff',
                                borderRadius: 2,
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden',
                                '&:hover': { boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' },
                            }}
                        >
                            <img
                                 src={imageUrl||'img/logo.png'} // שימוש ב-s3Key
                                // src='img/logo.png'
                                alt={file.name}
                                loading="lazy"
                                style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
                                onError={(e) => console.error("Error loading image:", e)}

                            />

                            <ImageListItemBar
                                title={file.name}
                                actionIcon={
                                    <Box>
                                        <IconButton
                                            onClick={() => downloadFileFromS3(file.s3Key, file.name)}
                                            sx={{ color: 'white' }}
                                        ><DownloadIcon />
                                            {/* תוכן הכפתור */}
                                        </IconButton>

                                        <IconButton sx={{ color: 'white' }}>
                                            <ShareIcon />
                                        </IconButton>
                                        <IconButton sx={{ color: 'white' }}
                                         onClick={() => deleteFileOrFolder(file.id, "files")}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                }
                            />
                        </ImageListItem>
                    ):
                    (<Typography>אין תמונה זמינה</Typography>);
                      
                })} 
                       <Button
               variant="contained"
               color="secondary"
               onClick={() => setOpenNewFolderDialog(true)}
               sx={{ ml: 2 }}
           >
               הוסף תיקייה
           </Button>
           <NewFolderDialog
            open={openNewFolderDialog}
            onClose={() => setOpenNewFolderDialog(false)}
            onCreate={handleCreateFolder }
        />

        {/* כפתור העלאה */}

</ImageList>
               
                
       
                
            )}

<Button
                variant="contained"
                color="primary"
                onClick={() => setOpenUpload(true)}
            >
                העלאה
            </Button>
            <FileUpload
                open={openUpload}
                onClose={() => setOpenUpload(false)}
                onUpload={handleUpload}
                folderId={currentFolder || '0'}
                ownerId={ownerId} // העברת ownerId
            />
            <AiButton/>
        </Box>
        
    );
}



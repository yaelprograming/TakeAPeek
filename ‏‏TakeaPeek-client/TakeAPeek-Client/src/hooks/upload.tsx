import React from "react";
import { Container, Typography } from "@mui/material";
import axios from "axios";

import { useSelector } from "react-redux";
import { MyFile } from "../types/types";
import { RootState } from "../globalStates/store";
import FileUpload from "./fileUpload";

const Upload = () => {
  const url = "http://localhost:5293/files"; // נתיב ה-API להעלאת קבצים
  const user = useSelector((state: RootState) => state.user.list[state.user.list.length - 1]); // או לפי האיד של המשתמש הנוכחי אם יש לך

//   const handleUpload = async (files: MyFile[], _folderId: string) => {
//     const formData = new FormData();

//     for (const file of files) {
//         console.log(file);
//         formData.append("file", file); // הוספת הקובץ לפורמט הנכון


//         // הוספת מטא-דאטה עם פרטי הקובץ
//         formData.append("FileName", file.name);
//         formData.append("FileType", file.fileType);
//         formData.append("FolderId", _folderId);
//         formData.append("Size", file.size);
//         formData.append("S3Key", `${_folderId}/${file.name}`);
//         formData.append("IsDeleted", "false");
//         formData.append("OwnerId", user?.id ?? '0');

//         try {
//             const response = await axios.post(url, formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data"
//                 }
//             });

//             console.log("File uploaded successfully:", response.data);
//         } catch (error) {
//             if (axios.isAxiosError(error)) {
//                 console.error("Error uploading file:", error.response?.data || error.message);
//             } else {
//                 console.error("Unknown error:", error);
//             }
//         }
//     }
// }
const handleUpload = async (files: MyFile[], _folderId: string) => {
  if (files.length === 0) {
      console.error("No files selected for upload.");
      return;
  }

  const formData = new FormData();

  // Append all files correctly
  for (const file of files) {
      console.log("Uploading file:", file);
      formData.append("files", file); // Change key to "files" (plural)
  }

  // Append metadata (added only once!)
  formData.append("FolderId", _folderId);
  formData.append("OwnerId", user?.id ?? "0");

  try {
      const response = await axios.post(url, formData, {
          headers: {
              "Content-Type": "multipart/form-data"
          }
      });

      console.log("File uploaded successfully:", response.data);
  } catch (error) {
      if (axios.isAxiosError(error)) {
          console.error("Error uploading file:", error.response?.data || error.message);
      } else {
          console.error("Unknown error:", error);
      }
  }
};

return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Upload Files to FrameIt
      </Typography>
      <FileUpload onUpload={handleUpload} />
    </Container>
  );
};

export default Upload;
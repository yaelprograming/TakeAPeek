
// const downloadFile = async (fileId:string) => {
//   try {
//     const response = await axiosInstance.get(`http://localhost:5293/files/${fileId}/download`, {
//       responseType: 'blob',  
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`, 
//       },
//     });

//     const url = window.URL.createObjectURL(new Blob([response.data]));
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', response.headers['content-disposition'].split('filename=')[1]); 
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//   } catch (error) {
//     console.error('Error downloading file:', error);
//   }
// };
// const API_BASE_URL = 'http://localhost:5293'; 


const downloadFile = async (fileId: string) => {
  console.log("Downloading file with ID:", fileId);
  const response = await fetch(`/files/${fileId}/download`);
  if (!response.ok) {
    console.error("שגיאה בהורדת הקובץ");
    return;
  }

  const blob = await response.blob();

  const contentDisposition = response.headers.get("Content-Disposition");
  const fileNameMatch = contentDisposition?.match(/filename="?(.+?)"?$/);
  const fileName = fileNameMatch?.[1] || "downloaded-file";

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName.replace(/[^a-zA-Z]/g, '')+".jpg"; // או כל סיומת אחרת שאתה רוצה
  a.click();
  window.URL.revokeObjectURL(url);
};


const downloadFolder = async (folderId: string, folderName: string) => {
console.log("Downloading folder with ID:", folderId);
try {
const response = await fetch(`/folders/${folderId}/download`, {
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

export{downloadFile, downloadFolder}

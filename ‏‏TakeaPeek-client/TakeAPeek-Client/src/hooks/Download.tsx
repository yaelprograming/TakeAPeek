import axios from 'axios';

const downloadFile = async (fileId:string) => {
  try {
    const response = await axios.get(`http://your-api-url/files/${fileId}/download`, {
      responseType: 'blob',  
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, 
      },
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', response.headers['content-disposition'].split('filename=')[1]); 
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};

export{downloadFile}

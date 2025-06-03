import axios from "axios";


const BASE_URL = 'http://localhost:5293'; 
export const deleteFile = async (fileId: string) => {
    try {
      await axios.delete(`${BASE_URL}/${fileId}`);
    } catch (error) {
      console.error('Delete failed', error);
      throw new Error('המחיקה נכשלה');
    }
  };
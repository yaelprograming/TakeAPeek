import axiosInstance from "./axsiosInstance";

// const BASE_URL = 'http://localhost:5293'; 
export const deleteFile = async (fileId: string) => {
    try {
      await axiosInstance.delete(`/${fileId}`);
    } catch (error) {
      console.error('Delete failed', error);
      throw new Error('המחיקה נכשלה');
    }
  };
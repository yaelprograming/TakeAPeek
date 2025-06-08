// Delete.ts
import axiosInstance from "./axsiosInstance"

export const deleteFile = async (fileId: string) => {
  try {
    await axiosInstance.delete(`files/${fileId}`)
  } catch (error) {
    console.error("Delete file failed", error)
    throw new Error("המחיקה נכשלה")
  }
}

export const deleteFolder = async (folderId: string) => {
  try {
    await axiosInstance.delete(`folders/${folderId}`)
  } catch (error) {
    console.error("Delete folder failed", error)
    throw new Error("מחיקת תקייה נכשלה")
  }
}

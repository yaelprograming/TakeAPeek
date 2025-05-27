import axios from "axios"

const API_BASE_URL = "http://localhost:5293"

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const analyzeAllImages = async () => {
  try {
    const response = await apiClient.get("/analyze-all-images")
    return response.data
  } catch (error) {
    console.error("Error analyzing images:", error)
    throw error
  }
}

export const getFolderContents = async (folderId = "0") => {
  try {
    const response = await apiClient.get(`/folders/${folderId}/contents`)
    return response.data
  } catch (error) {
    console.error(`Error fetching folder contents for folder ${folderId}:`, error)
    throw error
  }
}

export const downloadFile = async (fileId: string) => {
  try {
    const response = await apiClient.get(`/files/${fileId}/download`, {
      responseType: "blob",
    })
    return response.data
  } catch (error) {
    console.error(`Error downloading file ${fileId}:`, error)
    throw error
  }
}

export default apiClient

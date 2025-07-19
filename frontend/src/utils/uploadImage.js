import { API_PATHS } from "./api-path";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData(); // image stored in form of file input
  // Append image file to form data
  formData.append("image", imageFile); // file is under the name image

  try {
    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {   // posts the image on backend
        "Content-Type": "multipart/form-data", // Set header for file upload
      },
    });

    return response.data; // Return response data maybe url of img or a success mssg
  } catch (error) {
    console.error("Error uploading the image:", error);
    throw error; // Rethrow error for handling
  }
};

export default uploadImage;

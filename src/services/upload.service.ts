import httpRequest from "@/utils/http-request";

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await httpRequest.post("/upload/file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  } catch (err) {
    console.error("Lỗi upload:", err);
  }
};

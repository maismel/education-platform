export const getFileType = (fileName?: string | null) => {
  if (!fileName) return "file";

  const ext = fileName.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "pdf":
      return "pdf";
    case "doc":
    case "docx":
      return "word";
    case "png":
    case "jpg":
    case "jpeg":
      return "image";
    default:
      return "file";
  }
};

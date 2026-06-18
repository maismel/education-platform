export const getAvatarSrc = (preview?: string) => {
  if (!preview) return "/placeholder.jpeg";
  if (preview.startsWith("blob:")) return preview;
  return preview;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const PdfPreview = ({ fileUrl }: { fileUrl: string }) => {
  return (
    <div className="w-full h-125 border rounded-md overflow-hidden">
      <iframe src={`${API_URL}${fileUrl}`} className="w-full h-full" />
    </div>
  );
};

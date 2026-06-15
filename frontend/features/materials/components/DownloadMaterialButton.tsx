import { Button } from "@/components/ui/button";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const DownloadMaterialButton = ({
  fileUrl,
  fileName,
}: {
  fileUrl: string;
  fileName?: string | null;
}) => {
  return (
    <a href={`${API_URL}${fileUrl}`} download target="_blank">
      <Button variant="outline">Download PDF</Button>
    </a>
  );
};

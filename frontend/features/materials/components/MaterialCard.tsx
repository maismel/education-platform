import { Button } from "@/components/ui/button";
import { useDeleteMaterial } from "@/features/materials/api/useDeleteMaterial";
import { getFileType } from "@/features/materials/helpers/getFileType";
import { useCurrentUser } from "@/features/users/api/useCurrentUser";
import { FileText, FileImage, File } from "lucide-react";
import { cn } from "@/lib/utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getIcon = (type: string) => {
  switch (type) {
    case "pdf":
    case "word":
      return <FileText className="w-5 h-5 text-red-500" />;
    case "image":
      return <FileImage className="w-5 h-5 text-blue-500" />;
    default:
      return <File className="w-5 h-5 text-gray-500" />;
  }
};

export interface FileLike {
  id: string;
  fileName: string | null;
  fileUrl: string | null;
  uploadedById: string;
}

interface MaterialCardProps {
  file: FileLike;
  variant?: "default" | "compact";
}

export const MaterialCard = ({
  file,
  variant = "default",
}: MaterialCardProps) => {
  const type = getFileType(file.fileName);
  const { mutate: deleteMaterial } = useDeleteMaterial();
  const { data: user } = useCurrentUser();

  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition",
        variant === "compact" && "w-fit",
      )}
    >
      {/* left */}
      <div className="flex items-center gap-2">
        {getIcon(type)}

        <div className="flex flex-col">
          <span
            className={cn(
              "text-sm font-medium truncate max-w-32 block",
              variant === "compact" && "max-w-12",
            )}
          >
            {file.fileName}
          </span>
          <span className="text-xs text-muted-foreground uppercase">
            {type}
          </span>
        </div>
      </div>

      {/* actions */}
      <div className="flex gap-2">
        <a href={`${API_URL}${file.fileUrl}`} target="_blank">
          <Button variant="outline" size="sm">
            Preview
          </Button>
        </a>

        {variant !== "compact" && (
          <Button
            type="button"
            onClick={() => deleteMaterial(file.id)}
            size="sm"
            disabled={user?.id !== file.uploadedById}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

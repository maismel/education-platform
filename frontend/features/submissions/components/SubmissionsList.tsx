import { MaterialCard } from "@/features/materials/components/MaterialCard";
import { Submission } from "@/shared/types/submission";

interface SubmissionsListProps {
  submissions: Submission[];
}

export const SubmissionsList = ({ submissions }: SubmissionsListProps) => {
  return (
    <div className="flex flex-col gap-2">
      {submissions?.map((m) => (
        <MaterialCard
          key={m.id}
          file={{
            id: m.id,
            fileName: m.fileName,
            fileUrl: m.fileUrl,
            uploadedById: m.studentId,
          }}
        />
      ))}
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { useGetLessonMaterials } from "@/features/materials/api/useGetLessonMaterials";
import { MaterialsList } from "@/features/materials/components/MaterialsList";
import { UploadMaterialDialog } from "@/features/materials/components/UploadMaterialDialog";
import { useMyLessonSubmissions } from "@/features/submissions/api/useMyLessonSubmissions";
import { SubmissionsList } from "@/features/submissions/components/SubmissionsList";
import { useCurrentUser } from "@/features/users/api/useCurrentUser";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

interface MaterialsSectionProps {
  lessonId: string;
  mode: "materials" | "submissions";
}

export const MaterialsSection = ({ lessonId, mode }: MaterialsSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: materials } = useGetLessonMaterials(lessonId);
  const { data: submissions } = useMyLessonSubmissions(lessonId);

  const { data: user } = useCurrentUser();

  const isTeacher = user?.role === "TEACHER";
  const title =
    mode === "materials"
      ? "Materials for the lesson"
      : "Submit your assignment";

  console.log("materials", materials);
  console.log("submissions", submissions);
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-4">
        <p className="text-xl font-bold">{title}</p>
        {mode === "materials" ? (
          <MaterialsList materials={materials ?? []} />
        ) : (
          <SubmissionsList submissions={submissions ?? []} />
        )}
      </div>
      {isTeacher && mode === "materials" && (
        <Button onClick={() => setIsOpen(true)}>
          <PlusIcon />
          <span>Add Material</span>
        </Button>
      )}

      {!isTeacher && mode === "submissions" && (
        <Button onClick={() => setIsOpen(true)}>
          <PlusIcon />
          <span>Submit Assignment</span>
        </Button>
      )}
      <UploadMaterialDialog
        lessonId={lessonId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mode={mode}
      />
    </div>
  );
};

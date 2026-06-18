"use client";
import { useParams } from "next/navigation";
import { useLesson } from "@/features/lessons/api/useLesson";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLessonSubmissions } from "@/features/submissions/api/useLessonSubmissions";
import { format } from "date-fns";
import { MaterialCard } from "@/features/materials/components/MaterialCard";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface SubmissionsTableProps {
  setId: (id: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const SubmissionsTable = ({
  setId,
  setIsOpen,
}: SubmissionsTableProps) => {
  const params = useParams<{
    courseId: string;
    lessonId: string;
  }>();
  const lessonId = params?.lessonId ?? "";

  const { data: lesson } = useLesson(lessonId ?? "");
  const { data: submissions = [] } = useLessonSubmissions(lessonId);

  if (!lesson) {
    return;
  }

  return (
    <div className="flex flex-col gap-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student name</TableHead>
            <TableHead>Submission Time</TableHead>
            <TableHead>Files</TableHead>
            <TableHead className="text-center">Grade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions?.length > 0 &&
            submissions?.map((submission) => {
              return (
                <TableRow key={submission.id}>
                  <TableCell className="wrap-break-word whitespace-normal">
                    {submission.student.email}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(submission.createdAt), "dd.MM.yyyy HH:mm")}
                  </TableCell>
                  <TableCell className="wrap-break-word whitespace-normal">
                    <MaterialCard
                      file={{
                        fileName: submission.fileName,
                        fileUrl: submission.fileUrl,
                        id: submission.id,
                        uploadedById: submission.studentId,
                      }}
                      variant="compact"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col items-center gap-2">
                      {submission.grade?.score && (
                        <p className="w-full flex justify-center">
                          {submission.grade?.score}
                        </p>
                      )}

                      {!submission.grade && (
                        <Button
                          className="flex gap-2"
                          size="sm"
                          onClick={() => {
                            setId(submission.id);
                            setIsOpen(true);
                          }}
                        >
                          <PlusIcon />
                          Assign Grade
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

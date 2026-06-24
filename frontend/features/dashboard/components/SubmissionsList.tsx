"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMySubmissions } from "@/features/submissions/api/useMySubmissions";
import { FileText, CheckCircle2, Clock3 } from "lucide-react";
import { format } from "date-fns";

export const SubmissionsList = () => {
  const { data: submissions = [] } = useMySubmissions();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "REVIEWED":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Graded
          </Badge>
        );

      case "PENDING":
      default:
        return (
          <Badge variant="secondary">
            <Clock3 className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardContent className="p-5">
        <h2 className="text-xl font-semibold mb-4">My Submissions</h2>

        {submissions.length === 0 ? (
          <p className="text-muted-foreground">
            You haven't submitted any assignments yet.
          </p>
        ) : (
          <div className="space-y-3">
            {submissions.map((sub) => {
              const score = sub.grade?.score;

              const gradeColor =
                score === undefined
                  ? "text-muted-foreground"
                  : score >= 9
                    ? "text-green-600"
                    : score >= 7
                      ? "text-yellow-600"
                      : "text-red-600";

              return (
                <div
                  key={sub.id}
                  className="flex items-center justify-between rounded-xl border p-4 hover:bg-muted/40 transition"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-muted p-2">
                      <FileText className="w-5 h-5" />
                    </div>

                    <div>
                      <p className="font-medium">{sub.lesson.title}</p>

                      <p className="text-xs text-muted-foreground mt-1">
                        Submitted{" "}
                        {format(new Date(sub.submittedAt), "dd.MM.yyyy HH:mm")}
                      </p>

                      <div className="mt-2">{getStatusBadge(sub.status)}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Grade</p>

                    <p className={`text-2xl font-bold ${gradeColor}`}>
                      {score ?? "—"}
                    </p>

                    {sub.grade?.teacher && (
                      <p className="text-xs text-muted-foreground mt-1">
                        by {sub.grade.teacher.email}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

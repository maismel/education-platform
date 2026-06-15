"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useMySubmissions } from "@/features/submissions/api/useMySubmissions";

export const SubmissionsList = () => {
  const { data: submissions = [] } = useMySubmissions();

  return (
    <Card>
      <CardContent className="p-5">
        <h2 className="text-lg font-semibold mb-3">Submissions</h2>

        {submissions.length === 0 ? (
          <p className="text-muted-foreground">No submissions yet</p>
        ) : (
          <div className="flex flex-col gap-3">
            {submissions.map((sub) => (
              <div key={sub.id}>
                <p className="font-medium">{sub.lesson.title}</p>

                <p className="text-sm text-muted-foreground">
                  Status: {sub.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

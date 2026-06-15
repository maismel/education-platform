export type Lesson = {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
  updatedAt: string;
  courseId: string;
  course: {
    id: string;
    title: string;
  };
};

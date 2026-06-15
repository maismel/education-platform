export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  teacherId: string;
  createdAt: string;
  updatedAt: string;
  teacher: {
    id: string;
    email: string;
  };
}

import { Lesson } from "@/features/lessons/api/useLessons";

export function lessonToFormValues(lesson: Lesson) {
  const startsAt = new Date(lesson.startsAt);
  const endsAt = new Date(lesson.endsAt);

  return {
    title: lesson.title,
    description: lesson.description,

    startsAtDate: startsAt,
    startsAtTime: startsAt,

    endsAtDate: endsAt,
    endsAtTime: endsAt,
  };
}

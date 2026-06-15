import { Material } from "@/features/materials/api/useGetLessonMaterials";
import { MaterialCard } from "./MaterialCard";

interface MaterialsListProps {
  materials: Material[]
}

export const MaterialsList = ({ materials }: MaterialsListProps) => {
  return (
    <div className="flex flex-col gap-2">
      {materials?.map((m) => (
        <MaterialCard key={m.id} file={m} />
      ))}
    </div>
  );
};

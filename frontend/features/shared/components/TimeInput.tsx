import { Input } from "@/components/ui/input";

interface TimeInputProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
}

export const TimeInput = ({ value, onChange }: TimeInputProps) => {
  const timeValue = value
    ? `${String(value.getHours()).padStart(2, "0")}:${String(
        value.getMinutes(),
      ).padStart(2, "0")}`
    : "";

  return (
    <Input
      type="time"
      value={timeValue}
      onChange={(e) => {
        const [hours, minutes] = e.target.value.split(":").map(Number);

        const baseDate = value ?? new Date(); // 🔥 FIX

        const nextDate = new Date(baseDate);
        nextDate.setHours(hours, minutes, 0, 0);

        onChange(nextDate);
      }}
    />
  );
};

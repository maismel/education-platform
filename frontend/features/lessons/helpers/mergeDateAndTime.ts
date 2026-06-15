export function mergeDateAndTime(
  date: Date | null | undefined,
  time: Date | null | undefined,
): Date | undefined {
  if (!date || !time) return undefined;

  const result = new Date(date);

  result.setHours(time.getHours());
  result.setMinutes(time.getMinutes());
  result.setSeconds(0);
  result.setMilliseconds(0);

  return result;
}

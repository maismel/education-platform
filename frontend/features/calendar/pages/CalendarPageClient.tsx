import dynamic from "next/dynamic";

const CalendarPageClient = dynamic(
  () => import("./CalendarPage").then((m) => m.CalendarPage),
  { ssr: false },
);

export default CalendarPageClient;

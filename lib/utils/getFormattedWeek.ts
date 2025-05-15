import { format, addDays } from "date-fns";

export const getFormattedWeek = (date = new Date()) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const weekStart = new Date(d.setDate(diff));
  const weekEnd = addDays(weekStart, 6);

  const formattedStart = format(weekStart, "MMM d, yyyy");
  const formattedEnd = format(weekEnd, "MMM d, yyyy");

  const week = `${formattedStart} - ${formattedEnd}`;
  return week;
}

import { parseISO, format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const formatUtcToVietnamDate = (date: string): string => {
  const dateISO = parseISO(date);

  const timeZone = "Asia/Ho_Chi_Minh";
  const dateInVN = toZonedTime(dateISO, timeZone);

  return format(dateInVN, "d MMMM yyyy", { locale: undefined });
};

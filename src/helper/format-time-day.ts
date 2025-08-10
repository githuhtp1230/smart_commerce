// helpers/format-time-day.ts
export const formatTimeDay = (
  dateInput?: Date | string | number | null
): string => {
  if (!dateInput) return "N/A";

  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "Invalid date";

  const daysOfWeek = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayMonthYear = date.toLocaleDateString("vi-VN");

  return `${dayOfWeek}, ${dayMonthYear}`;
};

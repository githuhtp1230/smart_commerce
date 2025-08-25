// helper/format.ts

/**
 * Format chuỗi phần trăm, ví dụ "12.245%" => "12%" hoặc "12.2%"
 * @param percentString string có dấu %, ví dụ "12.245%"
 * @param decimalDigits số chữ số thập phân muốn giữ, mặc định 0
 * @returns string đã format, ví dụ "12%" hoặc "12.2%"
 */
export function formatPercentage(
  percentString: string | undefined,
  decimalDigits: number = 0
): string {
  if (!percentString) return "0%";

  // loại bỏ ký tự %
  const num = parseFloat(percentString.replace("%", ""));
  if (isNaN(num)) return "0%";

  // làm tròn
  const factor = Math.pow(10, decimalDigits);
  const rounded = Math.round(num * factor) / factor;

  return `${rounded}%`;
}

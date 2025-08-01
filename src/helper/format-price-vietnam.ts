export const formatPrice = (price?: number | null): string => {
  if (price == null || isNaN(price)) return "N/A";
  return price.toLocaleString("vi-VN", {
    style: "decimal",
    minimumFractionDigits: 0,
  });
};

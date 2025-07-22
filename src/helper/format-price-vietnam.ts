export const formatPrice = (price: number | undefined): string => {
  if (price === undefined) return "N/A";
  return price.toLocaleString("vi-VN", {
    style: "decimal",
    minimumFractionDigits: 0,
  });
};

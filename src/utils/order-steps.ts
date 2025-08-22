const steps = [
  { name: "Confirmed", value: "CONFIRMED" },
  { name: "Shipping", value: "SHIPPING" },
  { name: "Delivered", value: "DELIVERED" },
];
export function statusToIndex(status?: string) {
  if (!status) return 0;
  const idx = steps.findIndex(
    s => s.value.toLowerCase() === status.toLowerCase()
  );
  return idx === -1 ? 0 : idx; 
}

export default steps;

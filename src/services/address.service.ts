import httpRequest from "@/utils/http-request";

export const getMyAddresses = async () => {
  const res = await httpRequest.get("/addresses");
  return res.data.data; // vì API trả về dạng ApiResponse => { code, message, data }
};

export const createAddress = async (payload: {
  streetAddress: string;
  ward: string;
  district: string;
  province: string;
}) => {
  const res = await httpRequest.post("/addresses", payload);
  return res.data.data;
};

export const setDefaultAddress = async (id: number) => {
  const res = await httpRequest.put(`/addresses/${id}/set-default`);
  return res.data;
};

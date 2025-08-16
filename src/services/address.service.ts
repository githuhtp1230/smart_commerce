import type { Address } from "@/type/auth";
import httpRequest from "@/utils/http-request";

export const getMyAddresses = async () => {
  const res = await httpRequest.get("/addresses");
  return res.data.data;
};

export const createAddress = async (payload: Partial<Address>) => {
  console.log(payload);
  const res = await httpRequest.post("/addresses", payload);

  return res.data.data;
};

export const updateDefaultAddress = async (id: number) => {
  const res = await httpRequest.put(`/addresses/${id}/set-default`);
  return res.data;
};

export const updateAddressService = async (payload: Partial<Address>) => {
  const { id, ...data } = payload;
  const res = await httpRequest.put(`/addresses/${id}`, data);
  return res.data.data;
};

export const deleteAddress = async (id: number) => {
  const res = await httpRequest.delete(`/addresses/${id}/delete`);
  return res.data.data;
};

export const fetchProvinces = async () => {
  const res = await fetch("https://provinces.open-api.vn/api/v2/p");
  const data = await res.json();
  return data;
};
export const fetchProvinceByCode = async (provinceCode: number) => {
  const res = await fetch(`https://provinces.open-api.vn/api/v2/p/${provinceCode}?depth=2`);
  const data = await res.json();
  return data;
};


export const fetchWards = async (provinceCode: number) => {
  const res = await fetch(
    `https://provinces.open-api.vn/api/v2/d/${provinceCode}?depth=2`
  );
  const data = await res.json();
  return data;
};

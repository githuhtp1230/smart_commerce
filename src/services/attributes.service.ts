import type { IAttribute, IAttributeValue } from "@/type/attribute";
import httpRequest from "@/utils/http-request";

export interface AttributeParams {
  isDeleted?: boolean;
}
export interface AttributeValueParams {
  isDeleted?: boolean;
  attributeId?: number;
}

export const fetchAttributes = async (
  params: AttributeParams = {}
): Promise<IAttribute[]> => {
  const res = await httpRequest.get("attributes", { params });
  return res.data.data;
};

export const fetchAttributeValues = async (
  params: AttributeValueParams = {}
): Promise<IAttributeValue[]> => {
  const res = await httpRequest.get("attribute-values", { params });
  return res.data.data;
};

export const createAttribute = async (name: string): Promise<IAttribute> => {
  const res = await httpRequest.post("attributes", {
    name,
    isDeleted: false,
  });
  return res.data.data;
};

export const createAttributeValue = async (payload: {
  value: string;
  attributeId: number;
}): Promise<IAttributeValue> => {
  const res = await httpRequest.post("attribute-values", {
    ...payload,
    isDeleted: false,
  });
  return res.data.data;
};

export const deleteAttribute = async (id: number): Promise<void> => {
  await httpRequest.delete(`/attributes/${id}/delete`);
};

export const deleteAttributeValue = async (id: number): Promise<void> => {
  await httpRequest.delete(`/attribute-values/${id}/delete`);
};

export const updateAttribute = async (
  id: number | string,
  data: Partial<Pick<IAttribute, "name">>
): Promise<IAttribute> => {
  const res = await httpRequest.put(`/attributes/${id}/update`, data);
  return res.data.data;
};

export const updateAttributeValue = async (
  id: number | string,
  data: Partial<Pick<IAttributeValue, "value">>
): Promise<IAttributeValue> => {
  const res = await httpRequest.put(`/attribute-values/${id}/update`, data);
  return res.data.data;
};

export const attributeApi = {
  fetchAttributes,
  createAttribute,
  deleteAttribute,
  updateAttribute,
  createAttributeValue,
  deleteAttributeValue,
  updateAttributeValue,
};

export const attributeValueApi = {
  fetchAttributeValues,
  createAttributeValue,
  deleteAttributeValue,
  updateAttributeValue,
};

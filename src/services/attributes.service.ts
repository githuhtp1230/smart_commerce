import type { IAttribute, IAttributeValue } from "@/type/attribute";
import httpRequest from "@/utils/http-request";

interface AttributeParams {
  isDeleted?: boolean;
}
interface AttributeValueParams {
  isDeleted?: boolean;
}

export const fetchAttributes = async ({
  isDeleted,
}: AttributeParams): Promise<IAttribute[]> => {
  const params: AttributeParams = {};

  if (isDeleted !== undefined) {
    params.isDeleted = isDeleted;
  }

  const res = await httpRequest.get("attributes", { params });
  return res.data.data;
};

export const fetchAttributevalues = async ({
  isDeleted,
}: AttributeValueParams): Promise<IAttributeValue[]> => {
  const params: AttributeValueParams = {};

  if (isDeleted !== undefined) {
    params.isDeleted = isDeleted;
  }

  const res = await httpRequest.get("attributevalues", { params });
  return res.data.data;
};

import type { ICategory } from "@/type/category";
import httpRequest from "@/utils/http-request";

interface CategoryParams {
  isDeleted?: boolean;
  isFetchChildren?: boolean;
}

export const fetchCategories = async ({
  isDeleted,
  isFetchChildren,
}: CategoryParams): Promise<ICategory[]> => {
  const params: CategoryParams = {};

  if (isDeleted !== undefined) {
    params.isDeleted = isDeleted;
  }

  if (isFetchChildren !== undefined) {
    params.isFetchChildren = isFetchChildren;
  }

  const res = await httpRequest.get("categories", { params });
  return res.data.data;
};

export const fetchSubCategories = async (
  isDeleted: boolean
): Promise<ICategory[]> => {
  const res = await httpRequest.get("categories", {
    params: {
      isChildren: true,
      isDeleted: isDeleted,
    },
  });
  return res.data.data;
};

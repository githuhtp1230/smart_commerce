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
export const createParentCategory = async (
  name: string
): Promise<ICategory> => {
  const res = await httpRequest.post("categories", {
    name,
    parentId: null,
  });
  return res.data.data;
};
export const deleteCategory = async (id: number): Promise<void> => {
  await httpRequest.post(`/categories/${id}/delete`);
};

export const createSubCategory = async ({
  name,
  parentId,
}: {
  name: string;
  parentId: number;
}): Promise<ICategory> => {
  const res = await httpRequest.post("categories", {
    name,
    parentId,
  });
  return res.data.data;
};
export const updateCategory = async (
  id: number | string,
  data: Partial<Pick<ICategory, "name" | "parentId">>
): Promise<ICategory> => {
  const res = await httpRequest.put(`/categories/${id}/update`, data);
  return res.data.data;
};

export const categoryApi = {
  fetchCategories,
  fetchSubCategories,
  createParentCategory,
  createSubCategory,
  deleteCategory,
  updateCategory,
};

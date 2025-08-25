"use client";

import { useState, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import {
  fetchCategories,
  createSubCategory,
} from "@/services/categories.service";
import type { ICategory } from "@/type/category";
import { toastError, toastSuccess } from "@/components/common/sonner";
import { useTranslation } from "react-i18next";

export default function AddSubCategory() {
  const [subName, setSubName] = useState("");
  const [parentId, setParentId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { data: parents = [], isLoading: isLoadingParents } = useQuery<
    ICategory[]
  >({
    queryKey: ["subcategories-parent"], // ✅ đổi key cho rõ ràng, tránh trùng key với danh sách subcategory
    queryFn: async () => {
      const data = await fetchCategories({ isDeleted: false });
      return data.filter((c) => c.parentId == null);
    },
  });

  const mutation = useMutation<
    ICategory,
    unknown,
    { name: string; parentId: number }
  >({
    mutationFn: createSubCategory,
    onSuccess: () => {
      toastSuccess(`Thêm danh mục con thành công`);
      setSubName("");
      setParentId(null);

      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toastError(`Lỗi: ${error.message}`);
      } else {
        toastError("Lỗi không xác định khi thêm danh mục con");
      }
      console.error("API Error:", error);
    },
  });

  const trimmed = useMemo(() => subName.trim(), [subName]);
  const canSubmit = trimmed && parentId && !mutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentId) {
      toastError("Vui lòng chọn danh mục cha");
      return;
    }
    if (!trimmed) {
      toastError("Vui lòng nhập tên danh mục con");
      return;
    }
    mutation.mutate({ name: trimmed, parentId });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-lg font-semibold mb-4 ml-50">{t("add_subcategory")}</h2>

      <form onSubmit={handleSubmit} className="flex items-end gap-4 flex-wrap">
        <div className="flex flex-col gap-1 w-60">
          <label className="text-sm font-medium">{t("category_name")}</label>
          <Select
            onValueChange={(value) => setParentId(Number(value))}
            value={parentId ? String(parentId) : undefined}
            disabled={isLoadingParents}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  isLoadingParents ? "Đang tải..." : "Chọn danh mục cha"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {parents.map((p) => (
                <SelectItem key={p.id} value={String(p.id)}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1 w-60">
          <label className="text-sm font-medium">{t("subcategory_name")}</label>
          <Input
            placeholder={t("enter_subcategory_name")}
            value={subName}
            onChange={(e) => setSubName(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          disabled={!canSubmit}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          {mutation.isPending ? "Đang thêm..." : "Thêm"}
        </Button>
      </form>
    </div>
  );
}

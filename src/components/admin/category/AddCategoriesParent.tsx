"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { createParentCategory } from "@/services/categories.service";
import type { ICategory } from "@/type/category";
import { toastError, toastSuccess } from "@/components/common/sonner";
import { useTranslation } from "react-i18next";

export default function AddCategoriesParent() {
  const [categoryName, setCategoryName] = useState("");
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const mutation = useMutation<ICategory, unknown, string>({
    mutationFn: createParentCategory,
    onSuccess: () => {
      toastSuccess(`Category added  successfully`);
      setCategoryName("");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toastError(`Error: ${error.message}`);
      } else {
        toastError("Unknown error while adding category");
      }
      console.error("API Error:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = categoryName.trim();
    if (trimmed) {
      mutation.mutate(trimmed);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-lg font-semibold mb-4 ml-30">{t("add_category")}</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          placeholder={t("enter_category_name")}
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={!categoryName.trim() || mutation.isPending}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          {mutation.isPending ? "Đang thêm..." : "Thêm danh mục"}
        </Button>
      </form>
    </div>
  );
}

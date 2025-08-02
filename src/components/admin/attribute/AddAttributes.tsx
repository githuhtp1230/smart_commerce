"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { toastError, toastSuccess } from "@/components/common/sonner";
import type { IAttribute } from "@/type/attribute";
import { createAttribute } from "@/services/attributes.service";

interface Props {
  onSuccess?: () => void;
  currentTab: string;
}

export default function AddAttributes({ onSuccess, currentTab }: Props) {
  const [attributeName, setAttributeName] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation<IAttribute, unknown, string>({
    mutationFn: createAttribute,
    onSuccess: () => {
      toastSuccess(`Thêm thuộc tính thành công`);
      setAttributeName("");

      if (currentTab === "false") {
        onSuccess?.();
      }

      queryClient.invalidateQueries({ queryKey: ["attributes"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toastError(`Lỗi: ${error.message}`);
      } else {
        toastError("Lỗi không xác định khi thêm thuộc tính");
      }
      console.error("API Error:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = attributeName.trim();
    if (trimmed) {
      mutation.mutate(trimmed);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-lg font-semibold mb-4 ml-30">Thêm thuộc tính</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          placeholder="Nhập tên thuộc tính"
          value={attributeName}
          onChange={(e) => setAttributeName(e.target.value)}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={!attributeName.trim() || mutation.isPending}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          {mutation.isPending ? "Đang thêm..." : "Thêm thuộc tính"}
        </Button>
      </form>
    </div>
  );
}

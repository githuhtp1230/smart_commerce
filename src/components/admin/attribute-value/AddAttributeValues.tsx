"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toastError, toastSuccess } from "@/components/common/sonner";
import type { IAttribute } from "@/type/attribute";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  attributeValueApi,
  fetchAttributes,
} from "@/services/attributes.service";
import { Plus } from "lucide-react";

interface Props {
  onSuccess?: () => void;
  currentTab: string;
}

export default function AddAttributeValues({ onSuccess, currentTab }: Props) {
  const [attributeValueName, setAttributeValueName] = useState("");
  const [selectedAttributeId, setSelectedAttributeId] = useState<string>("");

  const queryClient = useQueryClient();

  const { data: attributes = [] } = useQuery<IAttribute[]>({
    queryKey: ["attributes"],
    queryFn: () => fetchAttributes({ isDeleted: false }),
  });

  const mutation = useMutation({
    mutationFn: ({
      value,
      attributeId,
    }: {
      value: string;
      attributeId: number;
    }) => attributeValueApi.createAttributeValue({ value, attributeId }),
    onSuccess: () => {
      toastSuccess("Thêm giá trị thuộc tính thành công");
      setAttributeValueName("");
      setSelectedAttributeId("");

      if (currentTab === "false") {
        onSuccess?.();
      }

      queryClient.invalidateQueries({ queryKey: ["attributes"] });
    },
    onError: (error) => {
      toastError("Lỗi khi thêm giá trị thuộc tính");
      console.error("API Error:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = attributeValueName.trim();

    if (trimmed && selectedAttributeId) {
      mutation.mutate({
        value: trimmed,
        attributeId: Number(selectedAttributeId),
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Thêm giá trị thuộc tính</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Chọn thuộc tính */}
        <Select
          value={selectedAttributeId}
          onValueChange={(val) => setSelectedAttributeId(val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn thuộc tính" />
          </SelectTrigger>
          <SelectContent>
            {attributes.map((attr) => (
              <SelectItem key={attr.id} value={String(attr.id)}>
                {attr.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Nhập tên giá trị thuộc tính */}
        <Input
          placeholder="Nhập tên giá trị thuộc tính"
          value={attributeValueName}
          onChange={(e) => setAttributeValueName(e.target.value)}
          disabled={!selectedAttributeId}
        />

        {/* Nút submit */}
        <Button
          type="submit"
          disabled={
            !selectedAttributeId ||
            !attributeValueName.trim() ||
            mutation.isPending
          }
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          {mutation.isPending ? "Đang thêm..." : "Thêm giá trị"}
        </Button>
      </form>
    </div>
  );
}

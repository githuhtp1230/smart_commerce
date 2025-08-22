"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
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
import { useTranslation } from "react-i18next";
import CustomInput from "@/components/common/input/CustomInput";

interface Props {
  onSuccess?: () => void;
  currentTab: string;
}

export default function AddAttributeValues({ onSuccess, currentTab }: Props) {
  const { t } = useTranslation();
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
      toastSuccess(t("Add attribute value successfully"));
      setAttributeValueName("");
      setSelectedAttributeId("");

      if (currentTab === "false") {
        onSuccess?.();
      }

      queryClient.invalidateQueries({ queryKey: ["attributes"] });
    },
    onError: (error) => {
      toastError(t("Add attribute value failed"));
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
    <div className="p-6 text-center">
      <h2 className="text-3xl font-semibold mb-4">
        {t("Add attribute value")}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-row justify-center md:flex-row items-center gap-4"
      >
        {/* Select thuộc tính */}
        <Select
          value={selectedAttributeId}
          onValueChange={(val) => setSelectedAttributeId(val)}
        >
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder={t("Select Attribute")} />
          </SelectTrigger>
          <SelectContent>
            {attributes.map((attr) => (
              <SelectItem key={attr.id} value={String(attr.id)}>
                {attr.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Input giá trị thuộc tính */}
        <CustomInput
          placeholder={t("Name Attribute Value")}
          value={attributeValueName}
          onChange={(e) => setAttributeValueName(e.target.value)}
          disabled={!selectedAttributeId}
          className="w-full md:w-[250px]"
        />

        {/* Button submit */}
        <Button
          type="submit"
          disabled={
            !selectedAttributeId ||
            !attributeValueName.trim() ||
            mutation.isPending
          }
          className="bg-blue-500 hover:bg-blue-600 whitespace-nowrap"
        >
          <Plus className="w-4 h-4 mr-2" />
          {mutation.isPending ? t("Adding...") : t("Add")}
        </Button>
      </form>
    </div>
  );
}

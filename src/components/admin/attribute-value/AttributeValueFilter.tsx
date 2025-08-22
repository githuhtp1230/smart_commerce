"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { fetchAttributes } from "@/services/attributes.service";
import type { IAttribute } from "@/type/attribute";

interface Props {
  value: string; // giá trị đang được filter (bên ngoài)
  onChange: (attributeId: string) => void; // hàm xử lý khi nhấn Filter
}

export default function AttributeValueFilter({ value, onChange }: Props) {
  const [attributes, setAttributes] = useState<IAttribute[]>([]);
  const [selectedAttribute, setSelectedAttribute] = useState(value);

  useEffect(() => {
    fetchAttributes({ isDeleted: false })
      .then(setAttributes)
      .catch(() => setAttributes([]));
  }, []);

  return (
    <div className="max-w-md mx-auto text-left mb-4">
      <h3 className="font-semibold text-lg mb-2">Chọn thuộc tính:</h3>
      <div className="flex gap-2 items-center">
        <Select value={selectedAttribute} onValueChange={setSelectedAttribute}>
          <SelectTrigger className="w-full">
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
        <Button
          onClick={() => onChange(selectedAttribute)}
          disabled={!selectedAttribute}
        >
          Lọc
        </Button>
      </div>
    </div>
  );
}

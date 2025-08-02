"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValue: string;
  onSubmit: (newValue: string) => void;
}

const EditAttributeValueDialog = ({
  open,
  onOpenChange,
  initialValue,
  onSubmit,
}: Props) => {
  const [value, setValue] = useState(initialValue ?? "");

  useEffect(() => {
    if (open) {
      setValue(initialValue ?? "");
    }
  }, [open, initialValue]);

  const handleUpdate = () => {
    const trimmedName = value.trim();
    const trimmedInitial = initialValue?.trim?.() ?? "";

    if (trimmedName && trimmedName !== trimmedInitial) {
      onSubmit(trimmedName);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Attribute Value</DialogTitle>
        </DialogHeader>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter new value attribute"
        />
        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={
              value.trim() === "" ||
              value.trim() === (initialValue?.trim?.() ?? "")
            }
            className="bg-blue-500 text-white"
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAttributeValueDialog;

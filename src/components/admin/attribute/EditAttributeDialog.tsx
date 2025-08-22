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
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialName: string;
  onSubmit: (newName: string) => void;
}

const EditAttributeDialog = ({
  open,
  onOpenChange,
  initialName,
  onSubmit,
}: Props) => {
  const [name, setName] = useState(initialName);
  const { t } = useTranslation();
  useEffect(() => {
    if (open) {
      setName(initialName);
    }
  }, [open, initialName]);

  const handleUpdate = () => {
    const trimmedName = name.trim();
    if (trimmedName && trimmedName !== initialName.trim()) {
      onSubmit(trimmedName);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Update Attribute")}</DialogTitle>
        </DialogHeader>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("Enter attribute name")}
        />
        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("Cancel")}
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={name.trim() === "" || name.trim() === initialName.trim()}
            className="bg-blue-500 text-white"
          >
            {t("Update")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAttributeDialog;

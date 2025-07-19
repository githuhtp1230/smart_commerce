import { useAuthStore } from "@/store/auth-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { PencilIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CropImageDialog from "../dialog/CropImageDialog";
import { toastSuccess } from "../sonner";
import { uploadFile } from "@/services/upload.service";
import { updateProfile } from "@/services/me.service";

interface Props {
  className?: string;
  imageUrl?: string;
  canCrop?: boolean;
  isMe?: boolean;
}

const CircleAvatar = ({
  className,
  imageUrl,
  canCrop = false,
  isMe = false,
}: Props) => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const { me, setMe } = useAuthStore((s) => s);

  const handleCompletedCropImg = async (img: string, file: File) => {
    if (me) {
      setMe({
        ...me,
        avatar: img,
      });
      setIsOpenDialog(false);
      toastSuccess("Update avatar successfully");
      const url = await uploadFile(file);
      updateProfile({ avatar: url });
    }
  };

  return (
    <>
      <div className="relative">
        <Avatar className={className}>
          <AvatarImage
            src={(isMe && me?.avatar) || imageUrl}
            className="object-cover object-center border border-border-primary rounded-full"
          />
          <AvatarFallback className="bg-elements-quarternary text-primary">
            U
          </AvatarFallback>
        </Avatar>
        <Button
          className={cn(
            "rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-primary hover:bg-secondary box-border border border-border-primary p-0 has-[>svg]:px-0 size-8",
            !canCrop && "hidden"
          )}
          onClick={() => setIsOpenDialog(true)}
          variant="default"
        >
          <PencilIcon className="size-4 text-neutral-primary" />
        </Button>
      </div>
      <CropImageDialog
        isOpen={isOpenDialog}
        setIsOpen={setIsOpenDialog}
        onCompletedCropImage={handleCompletedCropImg}
      />
    </>
  );
};

export default CircleAvatar;

import { useAuthStore } from "@/store/auth-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { NoneAvatar } from "@/assets/images";

const AvatarStore = () => {
  const avatar = useAuthStore((s) => s.me?.avatar);

  return (
    <Avatar>
      <AvatarImage
        src={avatar}
        className="object-cover object-center border border-border-primary rounded-full"
      />
      <AvatarFallback className="bg-elements-quarternary text-primary">
        U
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarStore;

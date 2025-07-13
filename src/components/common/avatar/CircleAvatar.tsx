import { useAuthStore } from "@/store/auth-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  imageUrl?: string;
}

const CircleAvatar = ({ className, imageUrl }: Props) => {
  return (
    <Avatar className={className}>
      <AvatarImage
        src={imageUrl}
        className="object-cover object-center border border-border-primary rounded-full"
      />
      <AvatarFallback className="bg-elements-quarternary text-primary">
        U
      </AvatarFallback>
    </Avatar>
  );
};

export default CircleAvatar;

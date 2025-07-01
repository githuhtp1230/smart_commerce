import { useAuthStore } from "@/store/auth-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

const AvatarStore = ({ className }: Props) => {
  const avatar = useAuthStore((s) => s.me?.avatar);

  return (
    <Avatar className={className}>
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

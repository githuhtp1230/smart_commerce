import { Badge } from "@/components/ui/badge";
import { ShieldCheck, UserRoundCog, Users } from "lucide-react";


interface Props {
    badgeColor: "admin" | "manage" | "user";
    content: string;
}
export const RoleBadge = ({ badgeColor, content }: Props) => {
    const renderBadge = () => {
        switch (badgeColor) {
            case "admin":
                return (
                    <Badge className="bg-foreground-system-success text-txt-system-success w-[100px]">
                        <div><ShieldCheck /> {" "}</div>
                        {content}
                    </Badge>
                );
            case "manage":
                return (
                    <Badge className="bg-foreground-system-information text-txt-system-information w-[100px]">
                        <div><UserRoundCog /> {" "}</div>
                        {content}
                    </Badge>
                );
            case "user":
                return (
                    <Badge className="bg-gray-200 text-gray-700 w-[100px]">
                        <div><Users /> {" "}</div>
                        {content}
                    </Badge>
                );


            default:
                return null;
        }
    }
    return (
        <div className="flex items-center gap-3 flex-wrap">{renderBadge()}</div>
    )
}

export default RoleBadge
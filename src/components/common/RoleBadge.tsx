import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter } from "@/helper/capitalize-first-letter";
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
                    <Badge className="bg-foreground-system-success text-txt-system-success w-[90px] flex justify-center items-center gap-1">
                        <div className="flex items-center"><ShieldCheck className="size-5.5" /></div>
                        <span className="text-sm">{capitalizeFirstLetter(content)}</span>
                    </Badge>
                );
            case "manage":
                return (
                    <Badge className="bg-foreground-system-information text-txt-system-information w-[90px] flex justify-center items-center gap-1">
                        <div className="flex items-center"><UserRoundCog className="size-5.5" /> </div>
                        {content}
                    </Badge>
                );
            case "user":
                return (
                    <Badge className="bg-background-lightgray-secondary text-txt-secondary w-[90px] flex justify-center items-center gap-1">
                        <div className="flex items-center"><Users className="size-5.5" /> </div>
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
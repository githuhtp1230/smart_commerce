import { Badge } from "@/components/ui/badge";

interface Props {
  badgeColor: "red" | "blue" | "amber" | "emerald" | "green";
  content: string;
}

export const AppBadge = ({ badgeColor, content }: Props) => {
  const renderBadge = () => {
    switch (badgeColor) {
      case "amber":
        return (
          <Badge className="bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 border-amber-600/60 shadow-none rounded-full">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-2" />{" "}
            {content}
          </Badge>
        );
      case "red":
        return (
          <Badge className="bg-red-600/10 dark:bg-red-600/20 hover:bg-red-600/10 text-red-500 border-red-600/60 shadow-none rounded-full">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2" />{" "}
            {content}
          </Badge>
        );
      case "blue":
        return (
          <Badge className="bg-blue-600/10 dark:bg-blue-600/20 hover:bg-blue-600/10 text-blue-500 border-blue-600/60 shadow-none rounded-full">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2" />{" "}
            {content}
          </Badge>
        );
      case "emerald":
        return (
          <Badge className="bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-full">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2" />{" "}
            {content}
          </Badge>
        );
      case "green":
        return (
          <Badge className="bg-green-600/10 dark:bg-green-600/20 hover:bg-green-600/10 text-green-500 border-green-600/60 shadow-none rounded-full">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2" />{" "}
            {content}
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">{renderBadge()}</div>
  );
};

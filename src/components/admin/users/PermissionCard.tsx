import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PermissionItem {
  name: string;
  enabled: boolean;
}

interface Props {
  permissions: PermissionItem[];
  togglePermission: (index: number) => void;
}

export default function PermissionCard({
  permissions,
  togglePermission,
}: Props) {
  const { t } = useTranslation();
  return (
    <div className="mt-4 space-y-4">
      <Card>
        <CardHeader className="pb-2 border-b">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-blue-600">
            <Shield className="w-5 h-5" /> {t("Permissions Settings")}
          </CardTitle>
          <p className="text-sm text-gray-500">
            {t("Manage access rights for this user")}
          </p>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 pt-2">
          {permissions.map((perm, index) => (
            <div
              key={perm.name}
              className="flex items-center justify-between p-3 rounded-xl border bg-background-primary hover:bg-blue-50 transition-all duration-300"
            >
              <span className="text-sm font-medium text-white">
                {perm.name}
              </span>
              <Switch
                checked={perm.enabled}
                onCheckedChange={() => togglePermission(index)}
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300"
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

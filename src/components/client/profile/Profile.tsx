import React from "react";

import ChangePasswordButton from "@/components/common/button/ChangePasswordButton";
import LeftUserProfile from "./LeftUserProfile";
import RightUserProfile from "./RightUserProfile";
import { useTranslation } from "react-i18next";
const Profile: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen ">
      <main className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-secondary-foreground">
            {t("Profile")}
          </h1>
          <ChangePasswordButton />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <LeftUserProfile />
          <RightUserProfile />
        </div>
      </main>
    </div>
  );
};
export default Profile;

import React from "react";

import ChangePasswordButton from "@/components/common/button/ChangePasswordButton";
import LeftUserProfile from "./LeftUserProfile";
import RightUserProfile from "./RightUserProfile";
const Profile: React.FC = () => {
  return (
    <div className="min-h-screen ">
      {/* Header */}
      {/* Main Content */}
      <main className="container mx-auto py-6">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-secondary-foreground">
            Profile
          </h1>
          <ChangePasswordButton />
        </div>
        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <LeftUserProfile />
          {/* Address Info */}
          <LeftUserProfile />
        </div>
      </main>
    </div>
  );
};
export default Profile;

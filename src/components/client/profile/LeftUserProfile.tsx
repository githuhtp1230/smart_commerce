import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth-store";
import AvatarEditor from "./AvatarEditor";
import NameEditor from "./NameEditor";
import UserStats from "./UserStats";

// Định nghĩa kiểu cho user data từ auth store
interface UserData {
  name: string | null;
  avatar: string | null;
}

// Main component for user profile section
const LeftUserProfile: React.FC = () => {
  const { me, setMe } = useAuthStore(
    (state: { me: UserData; setMe: (data: UserData) => void }) => state
  );
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);

  const handleAvatarChange = (newAvatarUrl: string) => {
    setCroppedImageUrl(newAvatarUrl);
  };

  const handleNameChange = (data: UserData) => {
    setMe(data);
  };

  return (
    <Card className="col-span-2 p-6 bg-primary">
      <div className="flex items-start gap-6">
        <AvatarEditor
          avatarUrl={croppedImageUrl || me?.avatar}
          userName={me?.name}
          onAvatarChange={handleAvatarChange}
        />
        <NameEditor userName={me?.name} onNameChange={handleNameChange} />
      </div>
      <UserStats />
    </Card>
  );
};

export default LeftUserProfile;

import React from "react";
import { Link, Outlet } from "react-router-dom";
import AuthTabs from "./AuthTabs";
import SocialLoginButtons from "@/components/modules/SocialLoginButtons";
import { Facebook, Google } from "@/assets/icons";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PATH } from "@/constants/path";

const AuthLayout = () => {
  return (
    <div className="bg-[url('/images/background_auth.jpg')] bg-cover bg-center h-screen flex items-center justify-center">
      <div className="max-w-screen-xl flex items-center justify-between w-full h-full p-10 gap-3">
        <div className="h-full flex flex-col justify-between">
          <Link
            to={PATH.HOME_PAGE}
            className="flex gap-2 items-center text-neutral-50 cursor-pointer"
          >
            <ChevronLeft />
            <p className="text-lg">Back to Home</p>
          </Link>
          <div className="space-y-2">
            <h1 className="text-neutral-50 font-bold text-6xl">
              Smart Commerce
            </h1>
            <p className="text-neutral-100 font-medium text-2xl">
              An intelligent e-commerce platform that helps you sell faster,
              manage your business more easily, and achieve sustainable growth.
            </p>
          </div>
          <div></div>
        </div>
        <div className="bg-primary max-w-130 rounded-2xl pt-8 pb-10 px-8 w-full">
          <h1 className="font-medium text-2xl text-center">
            Welcome to Smart Commerce
          </h1>
          <AuthTabs />
          <div className="mt-3">
            <Outlet />
          </div>
          <div className="relative flex items-center py-3">
            <div className="flex-grow border-t border-border-primary"></div>
            <span className="flex-shrink mx-4 text-neutral-primary text-sm">
              Or Countinue With
            </span>
            <div className="flex-grow border-t border-border-primary"></div>
          </div>
          <div className="mt-3">
            <SocialLoginButtons
              prefixIcon={Google}
              text="Continue with Google"
            />
            <SocialLoginButtons
              prefixIcon={Facebook}
              text="Continue with Facebook"
              className="mt-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

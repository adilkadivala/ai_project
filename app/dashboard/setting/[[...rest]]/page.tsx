import { UserProfile } from "@clerk/nextjs";
import React from "react";

const Setting = () => {
  return (
    <div className="flex items-center justify-center ">
      <UserProfile />
    </div>
  );
};

export default Setting;

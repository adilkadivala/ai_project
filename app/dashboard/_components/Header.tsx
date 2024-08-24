import { UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="p-4 shadow-sm border-b-2 flex justify-end bg-white items-center">
      <div className="flex gap-5 items-center">
        <h2 className=" bg-primary rounded-full text-xs text-white p-2">
          🎉Join MemberShip for just %9.50/month
        </h2>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;

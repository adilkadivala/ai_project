"use client";
import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserTrack from "./UserTrack";

const SideNav = () => {
  const MenuList = [
    {
      name: "Home",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    {
      name: "Billing",
      icon: WalletCards,
      path: "/dashboard/billing",
    },
    {
      name: "Setting",
      icon: Settings,
      path: "/dashboard/setting",
    },
  ];

  const path = usePathname();

  return (
    <div className="relative h-screen p-5 shadow-sm border bg-white">
      <div className="flex justify-center gap-1 ">
        <Image src={"/logo.svg"} alt="brand" width={30} height={30} />
        <p className="font-semibold text-lg text-sky-600">Dashboard</p>
      </div>

      <hr className="my-6 border" />

      <div className="mt-3">
        {MenuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <div
              className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer items-center ${
                path == menu.path && "bg-primary text-white"
              }`}
              key={index}
            >
              <menu.icon className="h-6 w-6" />
              <h2 className="text-lg">{menu.name}</h2>
            </div>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-10 w-full left-0 px-2">
        <UserTrack />
      </div>
    </div>
  );
};

export default SideNav;

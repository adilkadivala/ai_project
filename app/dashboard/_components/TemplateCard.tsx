import React from "react";
import { TEMPLATE } from "./TemplateSec";
import Image from "next/image";
import Link from "next/link";

const TemplateCard = (item: TEMPLATE) => {
  return (
    <Link href={"/dashboard/content/" + item?.slug}>
      <div className="p-2 shadow-md rounded-md bg-white border flex flex-row sm:flex-col gap-3 cursor-pointer hover:rotate-1 transition-all w-[250px]">
        <Image src={item.icon} alt="icon" width={50} height={50} />
        <h2 className="font-medium text-lg">{item.name}</h2>
        <p className="text-gray-500 line-clamp-3">{item.desc}</p>
      </div>
    </Link>
  );
};

export default TemplateCard;

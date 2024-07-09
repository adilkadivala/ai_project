"use client";
import React from "react";
import { TEMPLATE } from "../../_components/TemplateSec";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface PROPS {
  selectedTemplate?: TEMPLATE;
}

const FromSection = ({ selectedTemplate }: PROPS) => {
  const onSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="p-5 shadow-md border rounded-lg">
      {/* @ts-ignore */}
      <Image src={selectedTemplate?.icon} alt="icon" width={70} height={70} />
      <h2 className="font-bold mb-2 text-2xl text-primary">
        {selectedTemplate?.name}
      </h2>
      <p className="text-gray-500 text-sm">{selectedTemplate?.desc}</p>

      <form className="mt-6" onSubmit={onSubmit}>
        {selectedTemplate?.form?.map((item, index) => (
          <div className="my-2 flex flex-col gap-2 mb-7">
            <label className="font-bold">{item.label}</label>
            {item.field == "input" ? (
              <Input />
            ) : item.field == "textarea" ? (
              <Textarea />
            ) : null}
          </div>
        ))}
        <Button type="submit" className="w-full py-6">
          Generate content
        </Button>
      </form>
    </div>
  );
};

export default FromSection;

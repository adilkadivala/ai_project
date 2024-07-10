"use client";
import FromSection from "../_components/FromSection";
import OutPutSection from "../_components/OutPutSection";
import { TEMPLATE } from "../../_components/TemplateSec";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PROPS {
  params: {
    "template-slug": string;
  };
}

const CreateNewContent = (props: PROPS) => {
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug == props.params["template-slug"]
  );

  const generateAIContent = (formdata: any) => {};

  return (
    <div className="p-5">
      <Link href={"/dashboard"}></Link>
      <Button>
        <ArrowLeft />
        Back
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-5">
        {/* from section */}
        <FromSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => console.log(v)}
        />
        {/* from section */}

        {/* Output  section */}
        <div className="col-span-2">
          <OutPutSection />
        </div>
        {/* Output  section */}
      </div>
    </div>
  );
};

export default CreateNewContent;

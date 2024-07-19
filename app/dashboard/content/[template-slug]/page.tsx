"use client";
import FromSection from "../_components/FromSection";
import OutPutSection from "../_components/OutPutSection";
import { TEMPLATE } from "../../_components/TemplateSec";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/Aimodel";
import { useState } from "react";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

interface PROPS {
  params: {
    "template-slug": string;
  };
}

const CreateNewContent = (props: PROPS) => {
  const [loading, setLoading] = useState(false);
  const [aiOutPut, setAiOutPut] = useState<string>("");

  const { user } = useUser();

  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug == props.params["template-slug"]
  );

  const generateAIContent = async (formdata: any) => {
    setLoading(true);

    const SelectedPrompt = selectedTemplate?.aiPrompt;

    const finelAiPrompt = JSON.stringify(formdata) + "," + SelectedPrompt;
    const result = await chatSession.sendMessage(finelAiPrompt);

    console.log(result.response.text());
    setAiOutPut(result?.response.text());
    await SaveInDb(formdata, selectedTemplate?.slug, result?.response.text());
    setLoading(false);
  };

  const SaveInDb = async (formData: any, slug: any, aiResp: string) => {
    const result = await db.insert(AIOutput).values({
      formData: formData,
      templateSlug: slug,
      aiResponse: aiResp,
      createdBy: user?.primaryEmailAddress?.emailAddress ?? "",
      createdAt: moment().format("DD/MM/YYYY"),
    });
    console.log(result);
  };

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
          userFormInput={(v: any) => generateAIContent(v)}
          loading={loading}
        />
        {/* from section */}

        {/* Output  section */}
        <div className="col-span-2">
          <OutPutSection aiOutPut={aiOutPut} />
        </div>
        {/* Output  section */}
      </div>
    </div>
  );
};

export default CreateNewContent;

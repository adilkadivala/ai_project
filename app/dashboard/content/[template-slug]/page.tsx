import React from "react";
import FromSection from "../_components/FromSection";
import OutPutSection from "../_components/OutPutSection";
import { TEMPLATE } from "../../_components/TemplateSec";
import Templates from "@/app/(data)/Templates";

interface PROPS {
  params: {
    "template-slug": string;
  };
}

const CreateNewContent = (props: PROPS) => {
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug == props.params["template-slug"]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-5">
      {/* from section */}
      <FromSection selectedTemplate={selectedTemplate} />
      {/* from section */}

      {/* Output  section */}
      <OutPutSection />
      {/* Output  section */}
    </div>
  );
};

export default CreateNewContent;

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useEffect, useRef } from "react";

require("@toast-ui/editor/dist/toastui-editor.css");
const { Editor } = require("@toast-ui/react-editor");

interface props {
  aiOutPut: string;
}

const OutPutSection = ({ aiOutPut }: props) => {
  const editorRef: any = useRef();

  useEffect(() => {
    const editorInterface = editorRef.current.getInstance();
    editorInterface.setMarkdown(aiOutPut);
  }, [aiOutPut]);

  return (
    <div className="bg-white shadow-lg border rounded-lg ">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium text-lg">Your Result</h2>

        <Button
          className="flex gap-2"
          onClick={() => navigator.clipboard.writeText(aiOutPut)}
        >
          <Copy className="w-4 h-4" /> Copy
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your Result will appear here"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        onChange={() =>
          console.log(editorRef.current.getInstance().getMarkdown())
        }
      />
    </div>
  );
};

export default OutPutSection;

require("@toast-ui/editor/dist/toastui-editor.css");

const { Editor } = require("@toast-ui/react-editor");

const OutPutSection = () => {
  return (
    <div className="bg-white">
      <Editor
        initialValue="hello react editor world!"
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
      />
    </div>
  );
};

export default OutPutSection;

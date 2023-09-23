import { TinaMarkdown } from "tinacms/dist/rich-text";

export const ContentBlock = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto text-lg my-3">
      {data.textz && <TinaMarkdown content={data.textz} />}
    </div>
  );
};

import { TinaMarkdown } from "tinacms/dist/rich-text";
import MarkdownContent from "../MarkdownContent";

export const ContentBlock = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto text-lg my-3 text-center px-4 lg:px-6">
      {data.textz && <MarkdownContent markdownText={data.textz} />}
    </div>
  );
};

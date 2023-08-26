import { TinaMarkdown } from "tinacms/dist/rich-text";

export const ContentBlock = ({ data }) => {
  return (
    <div className="img-responsive">
      {data.textz && <TinaMarkdown content={data.textz} />}
    </div>
  );
};

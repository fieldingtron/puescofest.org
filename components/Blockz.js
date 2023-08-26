import { HeadingBlock } from "./blocks/HeadingBlock";
import { ContentBlock } from "./blocks/ContentBlock";
import { ImageBlock } from "./blocks/ImageBlock";
export const Block = (block) => {
  //console.log(block);
  switch (block.__typename) {
    case "PageIntroHeading":
      return <HeadingBlock data={block} />;
    case "PageIntroContent":
      return <ContentBlock data={block} />;
    case "PageIntroImage":
      return <ImageBlock data={block} />;
    default:
      return null;
  }
};

import { HeadingBlock } from "./blocks/HeadingBlock";
import { ContentBlock } from "./blocks/ContentBlock";
import { ImageBlock } from "./blocks/ImageBlock";
export const Block = (block) => {
  console.log(block);
  console.log("type of block = " + block.__typename);
  switch (block.__typename) {
    case "PageIntroHeading":
    case "PageKayakHeading":
    case "PageLlegarHeading":
    case "PageTicketsHeading":
      return <HeadingBlock data={block} />;
    case "PageKayakContent":
    case "PageIntroContent":
    case "PageLlegarContent":
    case "PageTicketsContent":
      return <ContentBlock data={block} />;
    case "PageKayakImage":
    case "PageIntroImage":
    case "PageLlegarImage":
    case "PageTicketsImage":
      return <ImageBlock data={block} />;
    default:
      return null;
  }
};

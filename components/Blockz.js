import { HeadingBlock } from "./blocks/HeadingBlock";
import { ContentBlock } from "./blocks/ContentBlock";
import { ImageBlock } from "./blocks/ImageBlock";
export const Block = (block) => {
  const typeName = block.__typename.toString();
  // // console.log("type of block = " + typeName);
  // // console.log(typeName);

  if (typeName.includes("Heading")) {
    return <HeadingBlock data={block} />;
  } else if (typeName.includes("Content")) {
    return <ContentBlock data={block} />;
  } else if (typeName.includes("Image")) {
    return <ImageBlock data={block} />;
  }
  return <h1>No Matching Block Found</h1>;
};

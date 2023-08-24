import { HeadingBlock } from "./blocks/HeadingBlock";
import { tinaField } from "tinacms/dist/react";

export const Blockz = (props) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map(function (block, i) {
            return (
              <div key={i} data-tina-field={tinaField(block)}>
                <Block {...block} />
              </div>
            );
          })
        : null}
    </>
  );
};

const Block = (block) => {
  switch (block.__typename) {
    case "PageIntroHeading":
      //return <HeadingBlock data={block} />;
      return <h4>PageIntroHeading</h4>;

    case "PageIntroContent":
      //return <ContentBlock data={block} />;
      return <h4>PageIntroContent</h4>;
    case "PageIntroImage":
      return <h4>PageIntroImage</h4>;

    //return <ImageBlock data={block} />;

    default:
      return null;
  }
};

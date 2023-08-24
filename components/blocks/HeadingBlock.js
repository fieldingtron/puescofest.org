import React from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/dist/react";

export const HeadingBlock = ({ data }) => {
  return (
    <div data-tina-field={tinaField(data)}>
      <h3>Heading Block</h3>
    </div>
  );
};

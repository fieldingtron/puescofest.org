import React from "react";
import TinaImageUpload from "./TinaImageUpload";

export const TinaImageUploadTinaField = ({ input }) => {
  // Tina passes {input} prop for custom fields
  return (
    <TinaImageUpload
      onFileAccepted={(file, sanitizedName) => {
        // Set value in Tina form
        input.onChange(`/uploads/${sanitizedName}`);
      }}
    />
  );
};

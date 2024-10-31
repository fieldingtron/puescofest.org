import React from "react";
import { useTina, tinaField } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";

export default function Video(props) {
  return (
    <section className="dark:bg-darkBlue light-back  min-h-full" id="video">
      <div className="container mx-auto p-6 lg:mb-0">
        <iframe
          className="w-full aspect-video"
          src="https://www.youtube.com/embed/L-q46gGVI8k?si=M8tRNIx52tA4XTFB"
        ></iframe>
      </div>
    </section>
  );
}

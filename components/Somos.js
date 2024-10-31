import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { Block } from "./Blockz";
import Heading from "./Heading";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import MarkdownContent from "./MarkdownContent";
import ButtonTicket from "./ButtonTicket";

export default function Somos({ data }) {
  // console.log("somos");
  //console.log(data.pagez.introtext);
  return (
    <section
      id="somos"
      className="dark:bg-darkBlue3 bg-alt2 bg-fixed bg-no-repeat bg-right-bottom lg:bg-mujer"
    >
      <Heading text="Somos" />

      <div className="container flex flex-col-reverse mx-auto p-6 lg:flex-row lg:space-x-8 lg:mb-0">
        {/* Text Section */}
        <div className="lg:w-1/2 text-lg text-center lg:text-left lg:text-xl lg:mt-0">
          <MarkdownContent markdownText={data.pagez.introtext} />

          {/* Button Section */}
          <ButtonTicket text="Entrada" />
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end my-4">
          <div className="w-full max-w-sm md:max-w-md lg:max-w-full h-80 lg:h-auto overflow-hidden">
            <img
              src={data.pagez.somosImgSrc}
              alt="Somos PuescoFest"
              className="w-full h-full object-cover"
              data-tina-field={tinaField(data.pagez, "somosImgSrc")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { Block } from "./Blockz";
import Heading from "./Heading";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import MarkdownContent from "./MarkdownContent";

export default function Somos({ data }) {
  // console.log("somos");
  //console.log(data.pagez.introtext);
  return (
    <section
      id="somos"
      className="dark:bg-darkBlue3 bg-teal-500/50 bg-fixed bg-no-repeat bg-right-bottom lg:bg-mujer"
    >
      <Heading text="Somos" />

      <div className="container flex flex-col-reverse mx-auto p-6 lg:flex-row lg:space-x-8 lg:mb-0">
        {/* Text Section */}
        <div className="lg:w-1/2 text-lg text-center lg:text-left lg:text-xl lg:mt-0">
          <MarkdownContent markdownText={data.pagez.introtext} />

          {/* Button Section */}
          <div className="mt-6 flex justify-center lg:justify-start">
            <a
              href="https://goldenpass.cl/puesco-fest-2024-roots-kayak/"
              className="p-6 px-16 text-lg font-semibold text-black bg-gray-300 rounded-lg shadow-md border-2 border-gray-300 hover:bg-white hover:text-gray-600 uppercase tracking-widest"
            >
              Entradas
            </a>
          </div>
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

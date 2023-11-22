import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { Block } from "./Blockz";
import Heading from "./Heading";

export default function Somos({ data }) {
  // console.log("somos");
  // console.log(data.pagez);
  return (
    <section
      id="somos"
      className="dark:bg-darkBlue3 bg-teal-500/50 bg-fixed bg-no-repeat bg-right-bottom lg:bg-mujer"
    >
      <Heading text="Somos" />

      <div className="container flex flex-col-reverse mx-auto p-6 lg:flex-row lg:mb-0">
        {/* <!-- Content --> */}

        <div className="flex flex-col space-y-10 lg:mt-10 lg:w-1/2">
          <p
            className="max-w-md mx-auto text-lg text-center lg:text-xl   lg:mt-0 lg:mx-0"
            data-tina-field={tinaField(data.pagez, "introtext")}
          >
            {data.pagez.introtext}
          </p>

          <div className="flex items-center justify-center w-full space-x-4 lg:justify-start">
            <a
              href="https://goldenpass.cl/event/6to-puestofest-somos-agua/"
              className="p-4 px-8  text-sm font-semibold text-black bg-gray-300 rounded shadow-md border-2 border-gray-300 md:text-xl hover:bg-white hover:text-gray-600 uppercase tracking-widest"
            >
              Entradas
            </a>
            <a
              href="https://drive.google.com/file/d/1gVE5srg8fxbXW3oEZ-2zfPa0b8d2EBwd/view?usp=sharing"
              target="_blank"
              className="p-4 px-8   text-sm font-semibold text-white bg-blue-400 rounded shadow-md border-2 border-softBlue md:text-xl hover:bg-red-400 hover:text-softBlue uppercase"
            >
              Programa
            </a>
          </div>
        </div>

        {/* <!-- Image --> */}
        <div className="relative mx-auto lg:mx-0 lg:mb-0 lg:w-1/2 pb-3">
          <img
            src={data.pagez.somosImgSrc}
            alt="Somos PuescoFest"
            className="relative z-10 lg:top-24 xl:top-0 overflow-x-hidden imgSquare imgTallRect"
            data-tina-field={tinaField(data.pagez, "somosImgSrc")}
          />
        </div>
      </div>
    </section>
  );
}

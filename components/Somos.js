import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { Block } from "./Blockz";

export default function Somos({ data }) {
  // console.log("somos");
  // console.log(data.pagez);
  return (
    <section id="somos" className="dark:bg-darkBlue3 bg-teal-500/50">
      <h2 className="text-4xl lg:text-6xl text-center uppercase mb-0">Somos</h2>

      <div className="container flex flex-col-reverse mx-auto p-6 lg:flex-row lg:mb-0">
        {/* <!-- Content --> */}

        <div className="flex flex-col space-y-10 lg:mt-10 lg:w-1/2">
          <h1 className="text-4xl font-semibold text-center lg:text-6xl lg:text-left mt-5 lg:mt-0">
            Puesco Fest
          </h1>
          <p
            className="max-w-md mx-auto text-lg text-center lg:text-2xl lg:text-left lg:mt-0 lg:mx-0"
            data-tina-field={tinaField(data.pagez, "introtext")}
          >
            {data.pagez.introtext}
          </p>

          <div className="flex items-center justify-center w-full space-x-4 lg:justify-start">
            <a
              href="#"
              className="p-4 text-sm font-semibold text-white bg-blue-400 rounded shadow-md border-2 border-softBlue md:text-base hover:bg-red-400 hover:text-softBlue"
            >
              Apprende Mas
            </a>
            <a
              href="#"
              className="p-4 text-sm font-semibold text-black bg-gray-300 rounded shadow-md border-2 border-gray-300 md:text-base hover:bg-white hover:text-gray-600"
            >
              Compra Tickets
            </a>
          </div>
        </div>

        {/* <!-- Image --> */}
        <div className="relative mx-auto lg:mx-0 lg:mb-0 lg:w-1/2">
          <img
            src={data.pagez.somosImgSrc}
            alt="Somos PuescoFest"
            className="relative z-10 lg:top-24 xl:top-0 overflow-x-hidden imgSquare"
            data-tina-field={tinaField(data.pagez, "somosImgSrc")}
          />
        </div>
      </div>
    </section>
  );
}

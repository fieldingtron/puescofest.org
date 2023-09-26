import React from "react";
import { useTina, tinaField } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";

export default function FAQ(props) {
  // console.log("faq");
  // console.log(props.data.faq);
  return (
    <section
      className="dark:bg-darkBlue light-back bg-fixed bg-no-repeat bg-right-bottom"
      id="lineUp"
      style={{ backgroundImage: `url("/images/araucarias1_bckgr.png")` }}
    >
      <div className="container mx-auto p-6 lg:mb-0">
        <h2 className="text-3xl md:text-4xl text-center font-semibold p-4 py-6">
          Frequently Asked Questions
        </h2>
        <p
          className="max-w-lg mx-auto text-center"
          data-tina-field={tinaField(props.data, "FAQintro")}

          // data-tina-field={tinaField(data.pagez, "introtext")}
        >
          {props.data.FAQintro}
        </p>
        <div className="max-w-2xl m-8 mx-auto overflow-hidden">
          {props.data.faq.map((faq, index) => (
            <div
              className="py-1 border-b outline-none group"
              tabIndex={index}
              key={`question${index}`}
              data-tina-field={tinaField(faq, "question")}
            >
              <div className="flex items-center justify-between py-3 transition duration-500 cursor-pointer group ease">
                <div className="transition duration-500 ease text-black dark:text-white group-hover:text-red-500 font-semibold">
                  {faq.question}
                </div>

                <div className="transition duration-500 ease group-focus:-rotate-180 group-focus:text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="12"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      d="M1 1l8 8 8-8"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="overflow-hidden transition duration-500 group-focus:max-h-screen max-h-0 ease">
                <p className="py-2 text-justify">{faq.response}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

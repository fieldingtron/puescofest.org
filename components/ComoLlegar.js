import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { Block } from "./Blockz";
import Heading from "./Heading";

export default function ComoLLegar({ data }) {
  //console.log(data);
  return (
    <section
      id="llegar"
      className=" dark:bg-darkBlue3
      bg-teal-500/50     bg-no-repeat bg-right-bottom bg-fixed lg:bg-martin-pescador"
    >
      <div className="container p-6 mx-auto">
        <Heading text="Como Llegar" />
        {data.pagez.llegar
          ? data.pagez.llegar.map(function (block, i) {
              return (
                <div key={i} data-tina-field={tinaField(block)}>
                  <Block {...block} />
                </div>
              );
            })
          : null}
      </div>
    </section>
  );
}

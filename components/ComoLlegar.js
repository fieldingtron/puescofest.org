import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { Block } from "./Blockz";

export default function ComoLLegar({ data }) {
  //console.log(data);
  return (
    <section
      id="comollegar"
      className="dark:bg-darkBlue light-back   bg-no-repeat bg-right-bottom"
      style={{ backgroundImage: `url("/images/araucarias2_bckgr.png")` }}
    >
      <div className="container p-6 mx-auto">
        <h1 className="text-6xl text-center p-4 py-6">Como Llegar</h1>

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

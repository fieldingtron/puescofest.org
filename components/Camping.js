import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { Block } from "./Blockz";
import Heading from "./Heading";

export default function Camping({ data }) {
  //console.log(data.pagez.feria);
  return (
    <section
      id="camping"
      className="dark:bg-darkBlue light-back   bg-no-repeat bg-right-bottom bg-fixed md:bg-mujer"
    >
      <div className="container p-6 mx-auto">
        <Heading text="Camping" />
        {data.pagez.camping
          ? data.pagez.camping.map(function (block, i) {
              return (
                <div key={`camping${i}`} data-tina-field={tinaField(block)}>
                  <Block {...block} />
                </div>
              );
            })
          : null}
      </div>
    </section>
  );
}

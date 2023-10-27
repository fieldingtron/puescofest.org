import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { Block } from "./Blockz";
import Heading from "./Heading";

export default function Feria({ data }) {
  //console.log(data.pagez.feria);
  return (
    <section
      id="feria"
      className="dark:bg-darkBlue light-back  bg-fixed bg-no-repeat bg-right-bottom lg:bg-martin-pescador"
    >
      <div className="container p-6 mx-auto">
        <Heading text="Feria de Emprendedores" />

        {data.pagez.feria
          ? data.pagez.feria.map(function (block, i) {
              return (
                <div key={`feria${i}`} data-tina-field={tinaField(block)}>
                  <Block {...block} />
                </div>
              );
            })
          : null}
      </div>
    </section>
  );
}

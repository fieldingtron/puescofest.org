import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { Block } from "./Blockz";

export default function Feria({ data }) {
  //console.log(data.pagez.feria);
  return (
    <section
      id="feria"
      className="dark:bg-darkBlue light-back  bg-fixed bg-no-repeat bg-right-bottom lg:bg-martin-pescador"
    >
      <div className="container p-6 mx-auto">
        <h1 className="text-6xl text-center p-4 py-6 uppercase">
          Feria de Emprendedores
        </h1>
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

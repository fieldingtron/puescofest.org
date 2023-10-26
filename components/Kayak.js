import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { Block } from "./Blockz";

export default function Kayak({ data }) {
  //console.log(data);
  return (
    <section
      id="kayak"
      className="dark:bg-darkBlue3
       bg-teal-500/50 bg-fixed bg-no-repeat bg-right-bottom lg:bg-morchelas"
    >
      <div className="container p-6 mx-auto">
        <h1 className="text-6xl text-center p-4 py-6 uppercase">
          Campeonato de Kayak
        </h1>

        {data.pagez.kayak
          ? data.pagez.kayak.map(function (block, i) {
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

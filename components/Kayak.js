import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { Block } from "./Blockz";
import Heading from "./Heading";

export default function Kayak({ data }) {
  //console.log(data);
  return (
    <section
      id="kayak"
      className="dark:bg-darkBlue3
       bg-alt2 bg-fixed bg-no-repeat bg-right-bottom lg:bg-morchelas"
    >
      <div className="container p-6 mx-auto">
        <Heading text="Campeonato de Kayak" />
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

import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { Block } from "./Blockz";

export default function Tickets({ data }) {
  //console.log(data);
  return (
    <section
      id="tickets"
      className="dark:bg-darkBlue3
      bg-teal-500/50   bg-no-repeat bg-right-bottom bg-fixed md:bg-mujer"
    >
      <div className="container p-6 mx-auto">
        <h1 className="text-6xl text-center p-4 py-6 uppercase">Tickets</h1>

        {data.pagez.tickets
          ? data.pagez.tickets.map(function (block, i) {
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

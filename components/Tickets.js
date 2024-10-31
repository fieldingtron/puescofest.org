import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { Block } from "./Blockz";
import Heading from "./Heading";
import ButtonTicket from "./ButtonTicket";

export default function Tickets({ data }) {
  //console.log(data);
  return (
    <section
      id="tickets"
      className="dark:bg-darkBlue3
      bg-alt2   bg-no-repeat bg-right-bottom bg-fixed md:bg-mujer"
    >
      <div className="container p-6 mx-auto">
        <Heading text="Tickets" />
        <ButtonTicket text="Obten tu ticket" />

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

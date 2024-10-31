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
        <div className="flex justify-center items-center  bg-gray-100">
          <div className="w-full max-w-4xl p-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3078.0324646467348!2d-71.54636712354831!3d-39.51375697159901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9613c1b6bc56817d%3A0x40af612560aca3ad!2sCaba%C3%B1as%20Puesco!5e0!3m2!1ses!2scl!4v1730301276269!5m2!1ses!2scl"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>

        {data.pagez.llegar
          ? data.pagez.llegar.map(function (block, i) {
              return (
                <div key={i} data-tina-field={tinaField(block)}>
                  <Block {...block} />
                </div>
              );
            })
          : null}

        <p className="text-center text-xl">
          Servicio de Transporte de Curarrehue a PuescoFest disponibles los días
          Viernes Sábado y Domingo. Valor dos mil pesos por persona, cada viaje
          (ida o vuelta)
        </p>
      </div>
    </section>
  );
}

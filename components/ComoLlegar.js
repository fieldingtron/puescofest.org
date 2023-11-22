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

        <p className="text-center text-xl">
          Servicio de Transporte de Curarrehue a PuescoFest disponibles los días
          Viernes Sábado y Domingo. Valor dos mil pesos por persona, cada viaje
          (ida o vuelta)
        </p>
        <p>
          <h3 className="mt-5 text-3xl">Ida Curarrehue-Puesco</h3>
          <h3 className="mt-5 text-xl">Viernes 24</h3>
          <ul>
            <li>7:00</li>
            <li>9:30</li>
            <li>18:00</li>
            <li>19:00</li>
          </ul>
          <h3 className="mt-5 text-xl">Sábado 25</h3>
          <ul>
            <li>9:30</li>
            <li>14:00</li>
            <li>19:00</li>
          </ul>
          <h3 className="mt-5 text-xl">Domingo 26</h3>
          <ul>
            <li>12:00</li>
            <li>15:00</li>
          </ul>
          <h3 className="mt-5 text-3xl"> Regreso Puesco-Curarrehue</h3>
          <h3 className="mt-5 text-xl">Viernes 24</h3>
          <ul>
            <li>7:30</li>
            <li>10:00</li>
            <li>18:30</li>
            <li>21:00</li>
          </ul>
          <h3 className="mt-5 text-xl">Sabado 25</h3>
          <ul>
            <li>10:00</li>
            <li>14:30</li>
            <li>21:00</li>
          </ul>
          <h3 className="mt-5 text-xl">Domingo 26</h3>
          <ul>
            <li>12:30</li>
            <li>18:00</li>
          </ul>
        </p>
      </div>
    </section>
  );
}

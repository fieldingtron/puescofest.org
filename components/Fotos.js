import React from "react";
import { useTina, tinaField } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";
import Heading from "./Heading";

export default function Fotos(props) {
  // console.log("fotos");
  // console.log(props.data.pagez.fotos);
  const fotos = props.data.pagez.fotos; //name imgSrc
  return (
    <section
      className="dark:bg-darkBlue light-back   bg-no-repeat bg-right-bottom bg-fixed md:bg-morchelas"
      id="fotos"
    >
      <div className="container mx-auto p-6 lg:mb-0">
        <Heading text="Fotos" />

        <div
          data-te-lightbox-init
          className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {fotos.map((foto, index) => (
            <div className="h-full w-full" key={`divf${index}`}>
              <img
                src={foto.imgSrc}
                data-te-img={foto.imgSrc}
                alt={foto.name}
                key={`fotos${`index`}`}
                className="w-full cursor-zoom-in data-[te-lightbox-disabled]:cursor-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

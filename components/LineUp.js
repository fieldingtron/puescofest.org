import React from "react";
import { useTina, tinaField } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";

export default function LineUp(props) {
  //console.log("Bands");
  //console.log(props);
  return (
    <section className="dark:bg-darkBlue light-back" id="lineUp">
      <div className="container mx-auto p-6 lg:mb-0">
        <h2 className="text-4xl lg:text-6xl text-center lg:text-left">
          Lineup{" "}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {props.pagez.bands.map((band, index) => (
            <a
              href={`#band${index}`}
              className="open-popup-link"
              data-te-toggle="modal"
              data-te-target={`#band${index}`}
              key={band.name}
              data-tina-field={tinaField(band, "name")}
            >
              <div className="hexagon">
                <h2 className="text-base">{band.name}</h2>
                <img src={band.imgSrc} alt={band.name} className="imgFit" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

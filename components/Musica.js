import React from "react";
import { useTina, tinaField } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";
import Heading from "./Heading";

export default function Musica(props) {
  //console.log("Bands");
  //console.log(props);
  return (
    <section className="dark:bg-darkBlue light-back" id="musica">
      <div className="container mx-auto p-6 lg:mb-0">
        <Heading text="Musica" />

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

        <Heading text="Actividades" id="actividades" />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {props.pagez.activities.map((activity, index) => (
            <a
              href={`#activity${index}`}
              className="open-popup-link"
              data-te-toggle="modal"
              data-te-target={`#activity${index}`}
              key={activity.name}
              data-tina-field={tinaField(activity, "name")}
            >
              <div className="hexagon">
                <h2 className="text-base">{activity.name}</h2>
                <img
                  src={activity.imgSrc}
                  alt={activity.name}
                  className="imgFit"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

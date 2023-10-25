import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { Block } from "./Blockz";

export default function Landing({ data }) {
  // console.log("somos");
  // console.log(data.pagez);
  return (
    <section id="landing" className="dark:bg-darkBlue3 bg-teal-500/50 ">
      <div className="  flex   items-center justify-center">
        <img src={data.pagez.landingImageSrc} alt="PuesoFest" />
      </div>
    </section>
  );
}

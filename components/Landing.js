import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { Block } from "./Blockz";

export default function Landing({ data }) {
  // console.log("somos");
  // console.log(data.pagez);
  return (
    <section id="landing" className="dark:bg-darkBlue3 bg-teal-500/50 ">
      <div className="  flex h-screen  items-center justify-center">
        <h1>Landing</h1>
      </div>
    </section>
  );
}

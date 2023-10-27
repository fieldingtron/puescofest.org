import React from "react";

export default function Heading({ text, id = "" }) {
  return (
    <h1
      className=" text-3xl md:text-4xl lg:text-6xl  text-center p-4 py-6 uppercase"
      id={id}
    >
      {text}
    </h1>
  );
}

import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { Block } from "./Blockz";

export default function Kayak({ data }) {
  // console.log(data);
  return (
    <section className="kayak-section dark-back2" id="kayak">
      <div className="container">
        <div className="row">
          <div className="col-md-11 col-md-offset-1 col-sm-offset-0 col-lg-8 col-lg-offset-2 ">
            {" "}
            <h2>Hi</h2>
            <h4 className="text-6xl">help </h4>
            {data.pagez.kayak
              ? data.pagez.kayak.map(function (block, i) {
                  return (
                    <div key={i} data-tina-field={tinaField(block)}>
                      <Block {...block} />
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </section>
  );
}
import React from "react";
import { useTina, tinaField } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";

export default function LineUp(props) {
  //console.log(props);
  return (
    <>
      <section className="lineUp-section light-back" id="lineUp">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-11 col-md-offset-1 col-lg-8 col-lg-offset-2">
              <h1 className="main-titleb">Line Up</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-11 col-md-offset-1 col-lg-8 col-lg-offset-2">
              <p>
                A continuación te presentamos las bandas comprometidas con la
                celebración por los Rios Libres este 2023
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
              <div className="row">
                {props.pagez.bands.map((band, index) => (
                  <div
                    key={`divpop${index}`}
                    className="col-lg-3 col-md-3 col-sm-4 col-xs-6"
                  >
                    <a
                      href={`#lineup-${index}`}
                      className="open-popup-link"
                      key={band.name}
                      data-tina-field={tinaField(band, "name")}
                    >
                      <div className="sphere">
                        <h4>{band.name}</h4>
                        <img
                          className="img-fluid"
                          src={band.imgSrc}
                          alt={band.name}
                        />
                      </div>
                    </a>
                  </div>
                ))}
                {/* <!--- Artist ---> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--- Artist Pop UP Detail---> */}
      {props.pagez.bands.map((band, index) => (
        <div
          key={`band${index}`}
          id={`lineup-${index}`}
          className="mfp-hide line-up"
        >
          <div className="cont">
            <div className="top">
              <figure>
                <img className="img-fluid" src={band.imgSrc} alt={band.name} />
              </figure>
            </div>
            <div className="bottom">
              <h3>{band.name}</h3>
              <ul>
                <li key={`bandyear-${index}`}>
                  <strong>Año:</strong> {band.year}
                </li>
                <li key={`bandstyle-${index}`}>
                  <strong>Género:</strong> {band.style}
                </li>
                <li key={`bandorigin-${index}`}>
                  <strong>Origen:</strong> {band.origin}
                </li>
              </ul>
              <div className="text-center">
                <ul className="redes">
                  <li>
                    <a
                      href={band.soundcloud}
                      target="_blank"
                      className="sc_icon icon"
                    >
                      <i className="fa fa-soundcloud" aria-hidden="true"></i>
                    </a>
                  </li>

                  <li>
                    <a
                      href={band.facebook}
                      target="_blank"
                      className="sc_icon icon"
                    >
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                  </li>

                  <li>
                    <a
                      href={band.instagram}
                      target="_blank"
                      className="sc_icon icon"
                    >
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

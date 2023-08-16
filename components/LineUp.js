import React from "react";

export default function LineUp() {
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
                <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                  <a href="#lineup-1" className="open-popup-link">
                    <div className="sphere">
                      <h4>Ana Tijoux</h4>

                      <img
                        className="img-fluid"
                        src="/artists/09_ana-tijoux/band-anatijoux_puescofest_huc3851fbfea84f76973750a7befb48cb4_53937_250x188_fill_q75_box_smart1.jpg"
                        alt="Ana Tijoux"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import React from "react";

export default function NavBar() {
  return (
    <>
      <section className="second-section" id="video">
        <nav className="navbar navbar-default ">
          <div className="container smallernav">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand mobile" href="/"></a>
            </div>

            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a
                    href=" https://www.facebook.com/puescofest/"
                    target="_blank"
                  >
                    <i
                      className="fa fa-facebook-official"
                      aria-hidden="true"
                    ></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/puescofest/"
                    target="_blank"
                  >
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
              <ul className="nav navbar-nav " id="main-nav-wrap">
                <a className="navbar-brand" href="/"></a>
                <li className="current">
                  <a
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                    href="#about"
                    className="smoothscroll"
                  >
                    Somos
                  </a>
                </li>
                <li>
                  <a
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                    href="#lineUp"
                    className="smoothscroll"
                  >
                    Line Up
                  </a>
                </li>
                <li>
                  <a
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                    href="#kayak"
                    className="smoothscroll"
                  >
                    Kayak
                  </a>
                </li>
                <li>
                  <a
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                    href="#routes"
                    className="smoothscroll"
                  >
                    Como Llegar
                  </a>
                </li>
                <li>
                  <a
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                    href="#camping"
                    className="smoothscroll"
                  >
                    Camping
                  </a>
                </li>
                <li>
                  <a
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                    href="#buen-vivir"
                    className="smoothscroll"
                  >
                    Buen Vivir
                  </a>
                </li>
                <li>
                  <a
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                    href="#tickets"
                    className="smoothscroll"
                  >
                    Tickets
                  </a>
                </li>
                <li>
                  <a
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                    href="#quetraer"
                    className="smoothscroll"
                  >
                    Que Traer
                  </a>
                </li>

                <li>
                  <a
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                    href="#contacto"
                    className="smoothscroll"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right mobile-nav">
                <li>
                  <a
                    href=" https://www.facebook.com/puescofest/"
                    target="_blank"
                  >
                    {" "}
                    <i
                      className="fa fa-facebook-official fa-2"
                      aria-hidden="true"
                    ></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/puescofest/"
                    target="_blank"
                  >
                    {" "}
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col-md-11 col-md-offset-1 col-sm-offset-0 col-lg-8 col-lg-offset-2 ">
              <div
                align="center"
                className="embed-responsive embed-responsive-16by9"
              >
                <video className="embed-responsive-item" controls>
                  <source src="/video/puesco-intro.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

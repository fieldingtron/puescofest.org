import Link from "next/link";
import Head from "next/head";
import Slider from "./Slider";
import LineUp from "./LineUp";

export const Layout = (props) => {
  return (
    <>
      <Head>
        <title>Puesco Fest</title>
        <meta
          name="description"
          content="Festival De Musica en Puesco Chile. Rios Libres"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="first-section" id="init">
        <div className="container responsive_img">
          <div className="row">
            <div className=" col-lg-3 col-sm-4 col-xs-12 col-md-3  col-sm-offset-0">
              <img
                className="img-responsive"
                src="/images/mobile-header-1.png"
                alt="Puesco Fest Mobile Header"
              />
            </div>
          </div>
        </div>
      </section>

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

      <header>
        <Link href="/">Home</Link>
        {" | "}
        <Link href="/posts">Posts</Link>
      </header>
      <main>{props.children}</main>
      <Slider />
      <LineUp />

      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h6>
                ©2023 PuescoFest | DESIGN BY{" "}
                <a href="http://jclabarca.com" target="_blank">
                  Juan Labarca
                </a>{" "}
                | CODE BY{" "}
                <a href="https://fieldsmarshall.com/" target="_blank">
                  Fields Marshall
                </a>
              </h6>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

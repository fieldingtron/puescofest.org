import Link from "next/link";
import Head from "next/head";
import Slider from "./Slider";
import LineUp from "./LineUp";
import NavBar from "./NavBar";
import Script from "next/script";

import { tinaField, useTina } from "tinacms/dist/react";

export const HomepageLayout = (props) => {
  console.log(props);
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

      <header>
        <Link href="/">Home</Link>
        {" | "}
        <Link href="/posts">Posts</Link>
      </header>
      <main>
        {props.children}

        <h1>insta</h1>
        <h2 data-tina-field={tinaField(props.pagez, "instagram")}>
          {props.pagez.instagram}
        </h2>
      </main>
      {/* <Slider /> */}
      <NavBar />
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
      <Script src="/js/puescofest.js" strategy="beforeInteractive" />
      {/* <Script src="/js/jqBootstrapValidation.js" strategy="lazyOnload" />
      <Script src="/js/contact_me.js" strategy="lazyOnload" /> */}
    </>
  );
};

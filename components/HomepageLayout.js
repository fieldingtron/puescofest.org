import Link from "next/link";
import Head from "next/head";
import Kayak from "./Kayak";
import LineUp from "./LineUp";
import NavBar from "./NavBar";
import Script from "next/script";
import ComoLlegar from "./ComoLlegar";
import Somos from "./Somos";
import ModalBand from "./ModalBand";
import Tickets from "./Tickets";

// import dynamic from "next/dynamic";

// const DynamicComponent = dynamic(() => import("./ModalBand"), {
//   ssr: false,
// });

import { tinaField, useTina } from "tinacms/dist/react";
import Contact from "./Contact";

export const HomepageLayout = (props) => {
  //console.log(props);
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
      <Script src="/js/darkmode.js" strategy="beforeInteractive" />

      <NavBar />
      <Somos data={props} />
      <LineUp pagez={props.pagez} />
      <ModalBand pagez={props.pagez} />

      <Kayak data={props} />
      <ComoLlegar data={props} />
      <Tickets data={props} />

      {/* <BlockDemo data={props} /> */}

      {/* <Contact /> */}
      <footer>
        <div className="container mx-auto  ">
          <p className="text-center">
            ©2023 PuescoFest | Design and Programming by{" "}
            <a href="https://fieldsmarshall.com/" target="_blank">
              Fields Marshall
            </a>
          </p>
        </div>
      </footer>
      <Script src="/js/tw-elements.umd.min.js" strategy="lazyOnload" />
      {/* <Script src="/js/jqBootstrapValidation.js" strategy="beforeInteractive" /> */}
      {/* <Script src="/js/contact_me.js" strategy="lazyOnload" /> */}
    </>
  );
};

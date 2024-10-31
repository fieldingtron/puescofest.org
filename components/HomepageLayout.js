import Head from "next/head";
import Kayak from "./Kayak";
import Musica from "./Musica";
import NavBar from "./NavBar";
import Script from "next/script";
import ComoLlegar from "./ComoLlegar";
import Somos from "./Somos";
import ModalBand from "./ModalBand";
import Modals2 from "./Modals2";
import Tickets from "./Tickets";
import Fotos from "./Fotos";
import Landing from "./Landing";
import Video from "./Video";
import Feria from "./Feria";
import Camping from "./Camping";

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
      <div className="odd:bg-white">
        <Landing data={props} />
        <Video data={props} />
      </div>

      <Somos data={props} />
      <Musica pagez={props.pagez} />
      <ModalBand pagez={props.pagez} />
      <Modals2 pagez={props.pagez} />
      <Kayak data={props} />
      <Feria data={props} />
      <Tickets data={props} />
      <Fotos data={props} />
      <ComoLlegar data={props} />
      <Camping data={props} />

      {/* <FAQ data={props.pagez} /> */}

      {/* <BlockDemo data={props} /> */}

      <Contact />
      <footer>
        <div className="container mx-auto  ">
          <img
            src="/images/sponsors.png"
            alt="Sponsors"
            className="py-2 mx-auto"
          />

          <p className="text-center my-2 mb-4">
            ©2024 PuescoFest | Diseño y Programación por{" "}
            <a href="https://fieldsmarshall.com/" target="_blank">
              Fields Marshall
            </a>
          </p>
        </div>
      </footer>
      <Script src="/js/tw-elements.umd.min.js" strategy="lazyOnload" />
    </>
  );
};

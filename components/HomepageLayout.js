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
        {/* <Video data={props} /> */}
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
      {/*  FOOTER */}
      <footer>
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center py-4">
            <div className="flex space-x-4 mb-2">
              <a
                href="https://www.instagram.com/puescofest/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
                aria-label="Instagram"
              >
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.659.388 3.678 1.37 2.697 2.351 2.437 3.463 2.379 4.744 2.321 6.025 2.309 6.434 2.309 12c0 5.566.012 5.975.07 7.256.058 1.281.318 2.393 1.299 3.374.981.981 2.093 1.241 3.374 1.299 1.281.058 1.69.07 7.256.07s5.975-.012 7.256-.07c1.281-.058 2.393-.318 3.374-1.299.981-.981 1.241-2.093 1.299-3.374.058-1.281.07-1.69.07-7.256s-.012-5.975-.07-7.256c-.058-1.281-.318-2.393-1.299-3.374C21.393.388 20.281.128 19 .07 17.719.012 17.309 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/puescofest/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
                aria-label="Facebook"
              >
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                </svg>
              </a>
            </div>
            <p className="text-center my-2 mb-4">
              ©2025 PuescoFest | Diseño por{" "}
              <a
                href="https://www.instagram.com/fields.marshall/"
                target="_blank"
              >
                Fields Marshall
              </a>{" "}
              <a href="https://www.instagram.com/tom_galvez/" target="_blank">
                Tom Galvez
              </a>{" "}
              y{" "}
              <a
                href="https://www.instagram.com/rudeboysclothing/"
                target="_blank"
              >
                Rudeboys Clothing
              </a>
            </p>
          </div>
        </div>
      </footer>
      <Script src="/js/tw-elements.umd.min.js" strategy="lazyOnload" />
    </>
  );
};

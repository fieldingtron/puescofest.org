import React from "react";
// import "tw-elements/dist/css/tw-elements.min.css";

import "./global.css";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />

      {/* <Script src="/js/jqBootstrapValidation.js" strategy="lazyOnload" />
      <Script src="/js/contact_me.js" strategy="lazyOnload" /> */}
    </>
  );
};

export default App;

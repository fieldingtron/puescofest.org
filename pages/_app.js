import React from "react";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />

      {/* <Script src="/js/puescofest.js" strategy="beforeInteractive" /> */}
      {/* <Script src="/js/jqBootstrapValidation.js" strategy="lazyOnload" />
      <Script src="/js/contact_me.js" strategy="lazyOnload" /> */}
    </>
  );
};

export default App;

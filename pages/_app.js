import React, { useEffect } from "react";
import "@/styles/globals.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { SSRProvider } from "react-bootstrap";
import { SessionProvider } from "next-auth/react";
import AccountProvider from "@/allApi/apicontext";
import Footer from "@/components/footer";

const Mobilenav = React.lazy(() => import("@/components/navbar/mobilenav"));

function App({ Component, pageProps, session }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.js");
  }, []);

  return (
    <SSRProvider>
      <AccountProvider>
        <SessionProvider session={session}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Mobilenav />
          </React.Suspense>
          <Component {...pageProps} />
        </SessionProvider>
        <Footer />
      </AccountProvider>
    </SSRProvider>
  );
}

export default App;

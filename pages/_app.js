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
import {SessionProvider} from 'next-auth/react'
import AccountProvider from "@/allApi/apicontext";
import Footer from "@/components/footer";

// const Feedback = dynamic(() => import("@/components/feedback"), {
//   ssr: false,
// });



function App({ Component, pageProps, session }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.js");
  }, []);
  
  return (
   
      <SSRProvider>
        <AccountProvider>
          <SessionProvider session={session}>
          <Component {...pageProps} />
          </SessionProvider>
  
          {/* <Feedback/> */}
          <Footer />
        </AccountProvider>
      </SSRProvider>
     
  );
}

export default App;

import React, { useEffect } from "react";
import "@/styles/globals.scss";
import {store, persistor} from "@/redux/store";
import { Provider } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css"; 
import { PersistGate } from 'redux-persist/integration/react'
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { SSRProvider } from "react-bootstrap";
import {SessionProvider} from 'next-auth/react'
import AccountProvider from "@/allApi/apicontext";
import Footer from "@/components/footer";
import dynamic from "next/dynamic";
import { createWrapper } from "next-redux-wrapper";
import Feedback from "@/components/feedback";

// const MyComponent = dynamic(() => import("@/components/feedback"), {
//   ssr: false,
// });

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

function App({ Component, pageProps, session }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.js");
  }, []);
  
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
      <SSRProvider>
        <AccountProvider>
          <SessionProvider session={session}>
          <Component {...pageProps} />
          </SessionProvider>
          {/* <MyComponent /> */}
          <Feedback/>
          <Footer />
        </AccountProvider>
      </SSRProvider>
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(App);

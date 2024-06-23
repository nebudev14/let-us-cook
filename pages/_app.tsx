import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Nav from "../components/nav";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      {/* <div className="flex items-center justify-center w-full">
        <Nav />
      </div> */}
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;

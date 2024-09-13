import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import Layout from "./layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json()),
          onError: (error, key) => {
            if (error.status !== 403 && error.status !== 404) {
              console.error("SWR Error:", error);
            }
          },
          revalidateOnFocus: false,
          dedupingInterval: 2000,
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;

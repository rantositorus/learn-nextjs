import Head from "next/head";

import Header from "../components/header";
import Footer from "../components/footer";

export default function Layout({ children, metaTitle, metaDescription }) {
  return (
    <div>
      <Head>
        <title>{`Create Next App - ${metaTitle}`}</title>
        <meta
          name="description"
          content={metaDescription || "Generated by create next app"}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

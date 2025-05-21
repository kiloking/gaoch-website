import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <title>高誠事業</title>
        <meta name="description" content="高誠建築體系" />
        <meta
          name="keywords"
          content="高、高誠、高誠事業、高誠開發、高華建設、高誠營造"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://web.forestdev.work/gaoch/favicon.ico" />
        <meta
          name="google-site-verification"
          content="85Z2bRxsVAZSOx3OwmJTdpCTuTAZvmbY_j1BEdd7jcM"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

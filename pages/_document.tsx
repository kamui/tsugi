import Document, { Html, Head, Main, NextScript } from "next/document"
import _static from "tsugi/lib/static"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>
          <meta charSet="utf-8" />
          <meta content="width=device-width initial-scale=1" name="viewport" />
          <meta name="theme-color" content="#00799c" />
          <meta name="application-name" content="tsugi" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={_static("favicons/apple-touch-icon.png")}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={_static("favicons/favicon-32x32.png")}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={_static("favicons/favicon-16x16.png")}
          />
          <link
            rel="mask-icon"
            href={_static("favicons/safari-pinned-tab.svg")}
            color="#00344B"
          />
          <link rel="manifest" href={_static("favicons/manifest.json")} />
          <link
            rel="preload"
            href={_static(
              "fonts/roboto-v18-latin/roboto-v18-latin-regular.woff"
            )}
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href={_static(
              "fonts/roboto-v18-latin/roboto-v18-latin-regular.woff2"
            )}
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href={_static(
              "fonts/roboto-slab-v7-latin/roboto-slab-v7-latin-regular.woff"
            )}
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href={_static(
              "fonts/roboto-slab-v7-latin/roboto-slab-v7-latin-regular.woff2"
            )}
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

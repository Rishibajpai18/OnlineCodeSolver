import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        
      <link
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/themes/prism-coy.min.css"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
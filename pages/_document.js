import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html className="bg-gray-300">
        <title>Exam Portal</title>
        <Head></Head>
        <body className="bg-background">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

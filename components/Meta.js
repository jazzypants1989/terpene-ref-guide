import Head from "next/head";

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <title>{title}</title>
      <keywords>{keywords}</keywords>
      <description>{description}</description>
    </Head>
  );
};

Meta.defaultProps = {
  title: "Cannabis Terpene Reference Guide",
  keywords:
    "cannabis, terpene, reference, guide, terpenes, terp, terps, myrcene, limonene",
  description:
    "The Cannabis Terpene Reference Guide is the go-to place for cannabis terpene information. Learn about the different terpenes found in cannabis and their effects.",
};

export default Meta;

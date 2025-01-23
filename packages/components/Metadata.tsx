import { description, images, pageURL, title } from "@packages/config/site";

function Metadata() {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" type="image/svg+xml" href={images.icon} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageURL} />
      <meta property="og:image" content={images.og} />
      <meta property="og:logo" content={images.logo} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Google / Search Engine Tags */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={images.logo} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={images.logo} />
    </>
  );
}

export default Metadata;

import { description, images, pageURL, title } from "@packages/config/site";

function Metadata() {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" type="image/svg+xml" href={images.icon} />
      <meta name="robots" content="index, follow" />

      {/* Google / Search Engine Tags */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={images.og} />

      {/* Facebook Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageURL} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:logo" content={images.logo} />
      <meta property="og:image" itemProp="image" content={images.og} />
      <meta
        property="og:image:secure_url"
        itemProp="image"
        content={images.og}
      />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={pageURL} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={images.og} />
    </>
  );
}

export default Metadata;

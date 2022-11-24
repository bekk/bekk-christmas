import Head from "next/head";
import { useRouter } from "next/router";

type SiteMetadataProps = {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  author?: string;
  canonicalUrl?: string;
  contentType?: string;
  children?: React.ReactNode;
};

export const defaultKeywords = [
  "bekk",
  "christmas",
  "technology",
  "design",
  "strategy",
];

export const SiteMetadata = ({
  title,
  description,
  keywords = defaultKeywords,
  image = "https://www.bekk.christmas/og-image.jpg",
  author = "Bekk",
  canonicalUrl,
  contentType = "article",
  children,
}: SiteMetadataProps) => {
  const router = useRouter();

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(",")} />
      <meta name="author" content={author} />

      <meta property="og:title" content={title} />
      <meta property="og:type" content={contentType} />
      <meta
        property="og:url"
        content={`https://www.bekk.christmas${
          router.asPath !== "/index" ? router.asPath : ""
        }`}
      />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@livetibekk" />
      <meta name="twitter:creator" content="@livetibekk" />

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {children}
    </Head>
  );
};

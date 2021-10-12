import Head from "next/head";
import { useRouter } from "next/router";

type SiteMetadataProps = {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  author?: string;
};
export const SiteMetadata = ({
  title,
  description,
  keywords = ["bekk", "christmas", "technology", "design", "strategy"],
  image = "",
  author = "Bekk",
}: SiteMetadataProps) => {
  const router = useRouter();

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(",")} />
      <meta name="author" content={author} />

      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`https://bekk.christmas${router.asPath}`} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@livetibekk" />
      <meta name="twitter:creator" content="@livetibekk" />
    </Head>
  );
};

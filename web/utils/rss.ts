import { writeFileSync } from "fs";
import { groq } from "next-sanity";
import stripTags from "striptags";
import { toDayYear } from "./date";
import { sanityClient } from "./sanity/sanity.server";
import { toPlainText } from "./sanity/utils";

type RssPost = {
  slug: string;
  title: string;
  description: any[];
  availableFrom: string;
};

/** Generates and updates the RSS feed file */
export const generateRss = async () => {
  const now = new Date();
  const posts = await sanityClient.fetch<RssPost[]>(
    groq`*[_type == 'post' && availableFrom <= $now] | order(availableFrom desc) { ..., "slug": slug.current }`,
    { now: `${now.getFullYear()}-12-${String(now.getDate()).padStart(2, "0")}` }
  );
  writeFileSync(
    `${process.cwd()}/public/rss.xml`,
    generateRssFeedString(posts)
  );
};

const generateRssFeedString = (posts: RssPost[]) => {
  return `
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Bekk Christmas</title>
    <link>https://bekk.christmas</link>
    <description>Get in the holiday spirit by diving into some of the many hundred articles we've made just for you</description>
    <language>en</language>
    <lastBuildDate>${new Date(
      posts[0].availableFrom
    ).toUTCString()}</lastBuildDate>
    <atom:link href="https://bekk.christmas/rss.xml" rel="self" type="application/rss+xml"/>
    
    ${posts.map(generateRssItem).join("")}
  </channel>
</rss>`.trim();
};

const generateRssItem = (post: RssPost) => {
  const { year, day } = toDayYear(post.availableFrom);
  return `
  <item>
    <guid>https://bekk.christmas/post/${year}/${day}/${post.slug}</guid>
    <title><![CDATA[${post.title}]]></title>
    <link>https://bekk.christmas/post/${year}/${day}/${post.slug}</link>
    <description><![CDATA[${stripTags(
      toPlainText(post.description)
    )}]]></description>
    <pubDate>${new Date(post.availableFrom).toUTCString()}</pubDate>
  </item>
`;
};

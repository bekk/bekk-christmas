import { writeFileSync } from "fs";
import { groq } from "next-sanity";
import stripTags from "striptags";
import { sanityClient } from "./sanity/sanity.server";

type RssPost = {
  _id: string;
  title: string;
  description: string;
  availableFrom: string;
};

/** Generates and updates the RSS feed file */
export const generateRss = async () => {
  const posts = await sanityClient.fetch<RssPost[]>(
    groq`*[_type == 'post' && availableFrom < $now] | order(availableFrom desc)`,
    { now: new Date().toISOString() }
  );
  writeFileSync("./public/rss.xml", generateRssFeedString(posts));
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
  return `
  <item>
    <guid>https://bekk.christmas/post/${post._id}</guid>
    <title><![CDATA[${post.title}]]></title>
    <link>https://bekk.christmas/post/${post._id}</link>
    <description><![CDATA[${stripTags(post.description)}]]></description>
    <pubDate>${new Date(post.availableFrom).toUTCString()}</pubDate>
  </item>
`;
};

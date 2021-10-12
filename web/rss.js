const fs = require("fs");
const path = require("path");
const grayMatter = require("gray-matter");
const remark = require("remark");
const stripMarkdownPlugin = require("strip-markdown");

const getAllArticles = () => {
  return (
    fs
      .readdirSync(path.join(process.cwd(), "post"), {
        encoding: "utf8",
      })
      // Only get the calendars, not any files
      .filter((dirent) =>
        fs.statSync(path.join(process.cwd(), "post", dirent)).isDirectory()
      )
      // Filter out the dummy calendar
      .filter((dirent) => dirent !== "dummy")
      .flatMap((calendar) => ({
        calendar,
        files: fs.readdirSync(path.join(process.cwd(), `post/${calendar}`)),
      }))
      .flatMap(({ calendar, files }) =>
        files.map((file) =>
          grayMatter.read(
            path.join(process.cwd(), `post/${calendar}/${file}`),
            {
              eval: false,
            }
          )
        )
      )
      .map((article) => {
        const now = new Date();
        const postDate = new Date(
          article.data.post_year,
          11,
          article.data.post_day
        );

        const isAvailable = postDate < now;
        return {
          ...article.data,
          isAvailable,
          content: article.content,
          ingressWithoutMarkdown: String(
            remark().use(stripMarkdownPlugin).processSync(article.data.ingress)
          ),
        };
      })
  );
};

const articlesRssXml = (articles) => {
  let latestArticleDate;
  let rssItemsXml = "";
  articles.forEach((article) => {
    const articleDate = new Date(article.post_year, 11, article.post_day);

    const articleHref = `https://bekk.christmas/${article.calendar}/${article.post_year}/${article.post_day}`;

    if (!latestArticleDate || articleDate > latestArticleDate) {
      latestArticleDate = articleDate;
    }

    // TODO: add authors and calendar
    rssItemsXml += `
          <item>
            <title><![CDATA[${article.title}]]></title>
            <link>${articleHref}</link>
            <pubDate>${article.post_year}/12/${article.post_day}</pubDate>
            <guid isPermaLink="false">${articleHref}</guid>
            <description>
            <![CDATA[${article.ingress}]]>
            </description>
            <content:encoded>
              <![CDATA[${article.content}]]>
            </content:encoded>
        </item>`;
  });
  return {
    rssItemsXml,
    latestArticleDate,
  };
};

const getRssXml = (articles) => {
  const { rssItemsXml, latestArticleDate } = articlesRssXml(articles);

  return `<?xml version="1.0" ?>
      <rss
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:content="http://purl.org/rss/1.0/modules/content/"
        xmlns:atom="http://www.w3.org/2005/Atom"
        version="2.0"
      >
        <channel>
            <title><![CDATA[Bekk Christmas - advent calendars about tech, design and strategy]]></title>
            <link>https://bekk.christmas</link>
            <description>
              <![CDATA[Get in the holiday spirit by diving into some of the many hundred articles we've made for you]]>
            </description>
            <language>en</language>
            <lastBuildDate>${latestArticleDate}</lastBuildDate>
            ${rssItemsXml}
        </channel>
      </rss>`;
};

function generateRSS() {
  console.log("Attempting to generate rss.xml");
  const allArticles = getAllArticles();
  const processedXml = getRssXml(allArticles);

  fs.writeFile(`${process.cwd()}/rss.xml`, processedXml, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Generated rss.xml successfully");
    }
  });
}

generateRSS();

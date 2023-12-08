import { SanityDocumentLike, Slug } from "sanity";

const remoteUrl = "https://bekk.christmas";
const localUrl = "http://localhost:3000";

export default function resolveProductionUrl(document: SanityDocumentLike) {
  const isLocalhost = window.location.hostname === "localhost";
  const baseUrl = isLocalhost ? localUrl : remoteUrl;

  const previewUrl = new URL(baseUrl);
  previewUrl.pathname = "/api/preview";
  previewUrl.searchParams.append(
    "secret",
    process.env.SANITY_STUDIO_PREVIEW_SECRET ?? ""
  );
  previewUrl.searchParams.append("url", getUrlForDocument(document));

  return previewUrl.toString();
}

function getUrlForDocument(doc: SanityDocumentLike) {
  switch (doc._type) {
    case "post":
      return getUrlForPost(doc);
    case "page":
      return getUrlForPage(doc);
    default:
      return "";
  }
}

function getUrlForPost(doc: SanityDocumentLike) {
  if (!doc.slug || !doc.availableFrom) {
    return "/";
  }
  const slug = doc.slug as Slug;
  const date = doc.availableFrom as string;
  if (!slug.current) {
    return "/";
  }
  const { day, year } = toDayYear(date);
  return `/post/${year}/${day}/${slug.current}`;
}

const getUrlForPage = (doc: SanityDocumentLike) => {
  const slug = doc.slug as Slug;
  return `/${slug.current}`;
};

const toDayYear = (date: string) => ({
  day: date.split("-")[2],
  year: date.split("-")[0],
});

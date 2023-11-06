const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET;

const remoteUrl = "https://bekk.christmas";
const localUrl = "http://localhost:3000";

export default function resolveProductionUrl(prev, context) {
  const { document } = context;
  const isLocalhost = window.location.hostname === "localhost";
  const baseUrl = isLocalhost ? localUrl : remoteUrl;

  const previewUrl = new URL(baseUrl);

  previewUrl.pathname = `/api/preview`;
  previewUrl.searchParams.append(`secret`, previewSecret);
  previewUrl.searchParams.append("url", getUrlForDocument(document));

  return previewUrl.toString();
}

function getUrlForDocument(doc) {
  switch (doc?._type) {
    case "post":
      return getUrlForPost(doc);
    case "page":
      return getUrlForPage(doc);
    default:
      return null;
  }
}

function getUrlForPost(doc) {
  if (!doc.availableFrom || !doc.slug.current) {
    return "/";
  }
  const { day, year } = toDayYear(doc.availableFrom);
  return `/post/${year}/${day}/${doc.slug.current}`;
}

const getUrlForPage = (doc) => {
  return `/${doc.slug.current}`;
};

const toDayYear = (date) => ({
  day: Number(date.split("-")[2]),
  year: Number(date.split("-")[0]),
});

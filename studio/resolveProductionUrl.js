const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET;

// TODO: Change this URL when we're ready to deploy to production
const remoteUrl = "https://bekk-christmas.vercel.app";
const localUrl = "http://localhost:3000";

export default function resolveProductionUrl(doc) {
  const isLocalhost = window.location.hostname === "localhost";
  const baseUrl = isLocalhost ? localUrl : remoteUrl;

  const previewUrl = new URL(baseUrl);

  previewUrl.pathname = `/api/preview`;
  previewUrl.searchParams.append(`secret`, previewSecret);
  previewUrl.searchParams.append("url", getUrlForDocument(doc));

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

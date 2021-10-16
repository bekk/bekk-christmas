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
  previewUrl.searchParams.append(`id`, doc?._id ?? `/`);
  if (doc?.slug) {
    previewUrl.searchParams.append(`slug`, doc.slug.current);
  }
  previewUrl.searchParams.append("type", doc?._type);

  return previewUrl.toString();
}

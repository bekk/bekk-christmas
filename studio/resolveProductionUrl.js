const previewSecret = process.env.SANITY_PREVIEW_SECRET || "development-secret";

const remoteUrl = "https://bekk.christmas";
const localUrl = "http://localhost:3000";

export default function resolveProductionUrl(doc) {
  const isLocalhost = window.location.hostname === "localhost";
  const baseUrl = isLocalhost ? localUrl : remoteUrl;

  const previewUrl = new URL(baseUrl);

  previewUrl.pathname = `/api/preview`;
  previewUrl.searchParams.append(`secret`, previewSecret);
  previewUrl.searchParams.append(`id`, doc?._id ?? `/`);
  previewUrl.searchParams.append("type", doc?._type);

  return previewUrl.toString();
}

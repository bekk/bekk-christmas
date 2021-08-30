import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "ah2n1vfr", // you can find this in sanity.json
  dataset: "production", // or the name you chose in step 1
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: "v2021-08-18", // use a UTC date string
});

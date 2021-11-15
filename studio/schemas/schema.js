import schemaTypes from "all:part:@sanity/base/schema-type";
import createSchema from "part:@sanity/base/schema-creator";
import author from "./documents/author";
import page from "./documents/page";
import post from "./documents/post";
import tag from "./documents/tag";
import codePen from "./objects/codePen";
import codeSandbox from "./objects/codeSandbox";
import descriptionText from "./objects/descriptionText";
import iframe from "./objects/iframe";
import imageWithMetadata from "./objects/imageWithMetadata";
import portableText from "./objects/portableText";
import socialMediaLink from "./objects/socialMediaLink";
import twitter from "./objects/twitter";
import unfurledUrl from "./objects/unfurled-url";
import youtube from "./objects/youtube";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    // Documents
    post,
    author,
    tag,
    page,

    // Objects (stuff used in documents)
    socialMediaLink,
    iframe,
    codePen,
    codeSandbox,
    descriptionText,
    imageWithMetadata,
    portableText,
    twitter,
    youtube,
    unfurledUrl,
  ]),
});

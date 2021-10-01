import schemaTypes from "all:part:@sanity/base/schema-type";
import createSchema from "part:@sanity/base/schema-creator";
import author from "./documents/author";
import post from "./documents/post";
import tag from "./documents/tag";
import codePen from "./objects/codePen";
import codeSandbox from "./objects/codeSandbox";
import iframe from "./objects/iframe";
import imageWithMetadata from "./objects/imageWithMetadata";
import portableText from "./objects/portableText";
import socialMediaLink from "./objects/socialMediaLink";
import twitter from "./objects/twitter";
import youtube from "./objects/youtube";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    // Documents
    post,
    author,
    tag,

    // Objects (stuff used in documents)
    socialMediaLink,
    iframe,
    codePen,
    codeSandbox,
    imageWithMetadata,
    portableText,
    twitter,
    youtube,
  ]),
});

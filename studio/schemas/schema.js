// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

import post from "./post.js";
import author from "./author.js";
import tag from "./tag.js";
import socialMediaLink from "./socialMediaLink.js";
import iframe from "./iframe.js";
import placeholder from "./placeholder.js";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    post,
    author,
    tag,
    socialMediaLink,
    iframe,
    placeholder,
  ]),
});

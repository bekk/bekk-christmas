import groq from "groq";
import { sanityClient } from "./sanity/sanity.server";

export type Tag = {
  slug: string;
  name: string;
  synonyms: string[];
};

export type PostLink = {
  id: string;
  title: string;
};

/** Gets all unique tags in Sanity */
export const getAllTags = () =>
  sanityClient.fetch<Tag[]>(groq`*[_type == "tag"]`);

/** Gets all posts tagged with a given tag */
export const getPostsByTag = (tag: string) =>
  sanityClient.fetch<PostLink[]>(
    groq`*[_type == "post" && references(*[_type == "tag" && slug == "${tag}"]._id)]{"id": _id, title}`
  );

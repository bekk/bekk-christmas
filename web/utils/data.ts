import groq from "groq";
import {} from "./sanity/sanity.client";
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

export type Post = {
  id: string;
  title: string;
  description: string;
  content: any;
  authors: string[];
  tags: string[];
  coverImage?: string;
  availableFrom: string;
};

/** Gets all unique tags in Sanity */
export const getAllTags = () => sanityClient.fetch<Tag[]>(groq`*[_type == "tag"]`);

/** Gets all posts tagged with a given tag */
export const getPostsByTag = (tag: string) =>
  sanityClient.fetch<PostLink[]>(
    groq`*[_type == "post" && references(*[_type == "tag" && slug == "${tag}"]._id)]{"id": _id, title}`
  );

/** Get a particular post by its ID */
export const getPostById = (id: string): Promise<Post> =>
  sanityClient.fetch<Post>(groq`
    *[_type == "post" && _id == "${id}"]
    {..., "authors": authors[].fullName, "tags": tags[]->.name}
    [0]
  `);

export const getAllPosts = () =>
  sanityClient.fetch<Post[]>(groq`*[_type == "post"]{..., "id": _id}`);

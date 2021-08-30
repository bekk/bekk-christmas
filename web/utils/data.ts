import client from "./sanity";
import { BlockContentProps } from "@sanity/block-content-to-react";

type Tag = {
  slug: string;
  name: string;
  synonyms: string[];
};

type PostLink = {
  id: string;
  title: string;
};

export type Post = {
  id: string;
  title: string;
  description: string;
  content: BlockContentProps;
  authorNames: string[];
  tags: string[];
  coverImage: string;
  availableFrom: string;
};

export const getAllTags = async (): Promise<Tag[]> => {
  return await client.fetch(`*[_type == "tag"]`);
};

export const getPostsByTag = async (tag): Promise<PostLink[]> => {
  return await client.fetch(
    `*[_type == "post" && references(*[_type == "tag" && slug == "${tag}"]._id)]{"id": _id, title}`
  );
};

export const getPostById = async (id): Promise<Post> => {
  return await client.fetch(`
    *[_type == "post" && _id == "${id}"]
    {..., "authors": authors[].fullName, "tags": tags[]->.name}
    [0]
  `);
  //
};

export const getAllPosts = async (): Promise<Post[]> => {
  return await client.fetch(`*[_type == "post"]{..., "id": _id}`);
};

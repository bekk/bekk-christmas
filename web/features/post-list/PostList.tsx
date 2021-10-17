import { Grid } from "@chakra-ui/react";
import React from "react";
import { ArticleItem, ArticlePostType } from "./ArticleItem";
import { ArtworkItem, ArtworkPostType } from "./ArtworkItem";

type PostType = ArticlePostType | ArtworkPostType;

type PostListProps = {
  posts: ArticlePostType[];
  day: number;
  year: number;
  children?: React.ReactNode;
};
export const PostList = ({ posts, day, year, children }: PostListProps) => {
  const postsWithIllustrations = decorateWithArtworkEntries(posts);
  return (
    <Grid
      overflowX={["visible", "scroll"]}
      gridAutoFlow={["row", "column"]}
      templateRows={["repeat(12, 1fr)", "repeat(2, 1fr)"]}
      templateColumns={["none", "repeat(6, 1fr)"]}
      minHeight="100vh"
    >
      {children}
      {postsWithIllustrations.map((post, index) => {
        switch (post._type) {
          case "post":
            return (
              <ArticleItem
                key={post.slug}
                post={post}
                year={year}
                day={day}
                index={index}
              />
            );
          case "artwork":
            return <ArtworkItem key={index} post={post} index={index} />;
          default:
            console.log("Unknown _type found", post);
            throw Error("Unknown post type found");
        }
      })}
    </Grid>
  );
};
const decorateWithArtworkEntries = (posts: PostType[]) => {
  const copyOfPosts: (ArticlePostType | ArtworkPostType)[] = [...posts];
  const arts = [
    {
      index: 2,
      src: "/illustrations/branch-with-white-berries.svg",
      alt: "A branch with white berries",
    },
    {
      index: 5,
      src: "/illustrations/man-working-at-computer.svg",
      alt: "A man working at his computer",
      mt: "40px",
    },
    {
      index: 8,
      src: "/illustrations/man-looking-at-phone.svg",
      alt: "A man looking at his phone",
      mt: "40px",
    },
    {
      index: 11,
      src: "/illustrations/branch-with-white-berries.svg",
      alt: "A branch with white berries",
    },
    {
      index: 14,
      src: "/illustrations/man-and-woman-looking-at-phones.svg",
      alt: "A man and a woman, looking at their phones.",
      mt: "40px",
    },
  ];
  arts.forEach(({ index, ...artProps }) => {
    if (index <= copyOfPosts.length) {
      copyOfPosts.splice(index, 0, {
        _type: "artwork",
        ...artProps,
      });
    }
  });
  return copyOfPosts;
};

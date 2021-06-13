import { Heading, ListItem, UnorderedList } from "@chakra-ui/layout";
import fs from "fs";
import { GetStaticProps } from "next";
import path from "path";
import { TextLink } from "../features/design-system/TextLink";
import { Layout } from "../features/layout/Layout";

type Props = {
  calendars: string[];
};
export default function Home({ calendars }: Props) {
  return (
    <Layout
      title="Bekk.christmas - advent calendars about tech, design and strategy"
      description="Get in the holiday spirit by diving into some of the many hundred articles we've made for you"
      keywords={[
        "tech",
        "technology",
        "design",
        "ux",
        "visual",
        "strategy",
        "business",
        "articles",
      ]}
    >
      <Heading as="h1">Calendars</Heading>
      <UnorderedList>
        {calendars.map((calendar) => (
          <ListItem key={calendar}>
            <TextLink href={`/${calendar}`}>{calendar}</TextLink>
          </ListItem>
        ))}
      </UnorderedList>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const calendars = fs
    .readdirSync(path.join(process.cwd(), "post"), { encoding: "utf8" })
    .filter((dirent) =>
      fs.statSync(path.join(process.cwd(), "post", dirent)).isDirectory()
    );

  return {
    props: {
      calendars,
    },
  };
};

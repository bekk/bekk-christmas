import { Box } from "@chakra-ui/layout";
import { AnchorFmPodcastBlock } from "./AnchorFmPodcastBlock";
import { CodePenBlock } from "./CodePenBlock";
import { CodeSandboxBlock } from "./CodeSandboxBlock";
import { TedTalkBlock } from "./TedTalkBlock";
import { VimeoBlock } from "./VimeoBlock";
import { YouTubeBlock } from "./YouTubeBlock";

/** Handles all the different iframes we support, with a generic fallback */
export const IframeBlock = ({ node }: any) => {
  if (node.src.includes("codesandbox.io")) {
    return <CodeSandboxBlock node={node} />;
  }
  if (node.src.includes("codepen.io")) {
    return <CodePenBlock node={node} />;
  }
  if (node.src.includes("anchor.fm")) {
    return <AnchorFmPodcastBlock node={node} />;
  }
  if (node.src.includes("vimeo.com")) {
    return <VimeoBlock node={node} />;
  }
  if (node.src.includes("youtube")) {
    return <YouTubeBlock node={node} />;
  }
  if (node.src.includes("ted.com")) {
    return <TedTalkBlock node={node} />;
  }

  return (
    <Box maxWidth="854px">
      <Box position="relative" height="0" pb="56.25%">
        <Box
          as="iframe"
          height={node.height ?? "265"}
          style={{ width: "100%" }}
          scrolling="no"
          src={node.src}
          frameBorder="no"
          allowTransparency
          allowFullScreen
        />
      </Box>
    </Box>
  );
};

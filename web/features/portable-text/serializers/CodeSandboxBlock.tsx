import React from "react";

export const CodeSandboxBlock = ({ node }: any) => {
  if (!node?.url) {
    return null;
  }
  const url = new URL(node.url);
  if (url.hostname !== "codesandbox.io") {
    console.error(
      `The URL provided was not a Code Sandbox URL. Instead, it was "${url}"`
    );
    return null;
  }
  let id;
  if (url.pathname.startsWith("/embed/")) {
    id = url.pathname.substring("/embed/".length);
  } else if (url.pathname.startsWith("/s/")) {
    id = url.pathname.substring("/s/".length);
  } else {
    console.error("Could not find the CodeSandbox id from the URL");
    return null;
  }
  return (
    <iframe
      src={`https://codesandbox.io/embed/${id}?fontsize=14&hidenavigation=1&theme=dark`}
      style={{
        width: "100%",
        height: "500px",
        border: 0,
        borderRadius: "4px",
        overflow: "hidden",
      }}
      title={id}
      allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
    />
  );
};

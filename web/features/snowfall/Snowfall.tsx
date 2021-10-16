import dynamic from "next/dynamic";
import React from "react";

const ReactSnowfall = dynamic(() => import("react-snowfall"), { ssr: false });

/** A simple wrapper for react-snowfall that makes it work with Next, as well as load lazily after the initial payload has been mounted */
export const Snowfall = () => {
  return <ReactSnowfall />;
};

import { useState } from "react";
import SearchInput from "./SearchInput";

type Props = {
  searchStr: string;
  setSearchStr: (value: string) => void;
  onEnter: () => void;
  onFocus: () => void;
  onBlur: () => void;
};

export default function SearchContainer({
  searchStr,
  setSearchStr,
  onEnter,
  onFocus,
  onBlur,
}: Props) {
  return (
    <SearchInput
      onFocus={() => onFocus()}
      onBlur={() => onBlur()}
      onChange={(e) => setSearchStr(e.target.value)}
      onClose={() => setSearchStr("")}
      value={searchStr}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          onEnter();
        }
      }}
    />
  );
}

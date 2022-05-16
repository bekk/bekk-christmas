import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getClient } from "../../utils/sanity/sanity.server";

export type SearchResultType = {
  title: string;
  slug: string;
};

const SearchContext = createContext(null);

type SearchContextType = {
  searchStr: string;
  setSearchStr: (searchStr: string) => void;
  loading: boolean;
  searchResults: SearchResultType[];
  searchIsActive: boolean;
  search: () => void;
  closeSearch: () => void;
};

export const useSearch = (): SearchContextType => {
  const context: SearchContextType | null = useContext(SearchContext);
  if (context === null) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return {
    searchStr: context.searchStr,
    setSearchStr: context.setSearchStr,
    loading: context.loading,
    searchResults: context.searchResults,
    searchIsActive: context.searchIsActive,
    search: context.search,
    closeSearch: context.closeSearch,
  };
};

export const SearchProvider = ({ children }) => {
  const [searchStr, setSearchStr] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchIsActive, setSearchIsActive] = useState<boolean>(false);

  const search = useCallback(async () => {
    if (searchStr.trim().length > 0) {
      setSearchIsActive(true);
      setLoading(true);
      const client = getClient();
      const results = await client.fetch<
        SearchResultType[]
      >(`*[[title, category, tags] match ["${searchStr}*"]]{
        title,
        slug,
      }`);
      setSearchResults(results);
      setLoading(false);
    }
    if (searchStr.trim().length === 0) {
      setSearchIsActive(false);
    }
  }, [searchStr]);

  useEffect(() => {
    if (searchStr.length === 0) {
      close();
    }
  }, [searchStr]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchStr.trim().length > 0) {
        search();
      }
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchStr, search]);

  const closeSearch = () => {
    setSearchIsActive(false);
    setSearchStr("");
    setSearchResults([]);
  };

  return (
    <SearchContext.Provider
      value={{
        searchStr,
        setSearchStr,
        loading,
        searchIsActive,
        searchResults,
        search,
        closeSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

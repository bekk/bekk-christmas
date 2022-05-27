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
  slug: {
    current: string;
  };
  availableFrom: string;
};

type SearchContextType = {
  query: string;
  setQuery: (query: string) => void;
  isLoading: boolean;
  hasError: boolean;
  searchResults: SearchResultType[];
  isSearchActive: boolean;
  onSearch: () => void;
  onClose: () => void;
};

const SearchContext = createContext<SearchContextType | null>(null);

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (context === null) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  const onSearch = useCallback(async () => {
    try {
      if (query.trim().length > 0) {
        setIsSearchActive(true);
        setHasError(false);
        setIsLoading(true);
        const client = getClient();
        const results = await client.fetch<SearchResultType[]>(`
            *[[title, tags,  category] match "${query}*"
            || pt::text(description) match "${query}*"
            || pt::text(authors) match "${query}*"
            || pt::text(content) match "${query}*"]
            | score(
                boost(pt::text(authors) match "${query}", 10),
                boost(title match "${query}", 5),
                boost(tags match "${query}", 4),
                boost(category match "${query}", 3),
                boost(pt::text(description) match "${query}", 2),
                boost(pt::text(content) match "${query}", 1),
            )
            | order(_score desc)
            { title, slug, availableFrom }
        `);
        setSearchResults(results);
      }
    } catch (error) {
      console.error(error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }

    if (query.trim().length === 0) {
      setIsSearchActive(false);
    }
  }, [query]);

  useEffect(() => {
    if (query.length === 0) {
      onClose();
    }
  }, [query]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query.trim().length > 0) {
        onSearch();
      }
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [query, onSearch]);

  const onClose = () => {
    setIsSearchActive(false);
    setQuery("");
    setSearchResults([]);
  };

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        isLoading,
        hasError,
        isSearchActive,
        searchResults,
        onSearch,
        onClose,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

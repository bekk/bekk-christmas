import React, { useCallback, useState } from 'react'
import { Box, Input } from "@chakra-ui/react"

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(false);
  const searchEndpoint = (query) => `/api/search?q=${query}`;

  const onChange = useCallback((e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if(searchQuery.length > 0) {
      fetch(searchEndpoint(searchQuery))
        .then(res => res.json())
        .then(res => setResults(res.results));
    } else {
      setResults([]);
    }
  }, []);

  return (
    <Box mb={10} pos="relative">
      <Input
        borderRadius={0}
        placeholder="Looking for something?"
        value={query}
        onChange={onChange}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      />
      { isActive && results.length > 0 && (
        <Box
          p={4}
          w="calc(100% + 2px)"
          left="-1px"
          pos="absolute"
          border="2px"
          borderColor="blue.500"
          borderTop="none"
          background="white"
        >
          {results.map(result => (
            <p>{result}</p>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default Search;
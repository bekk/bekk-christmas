import React, { useCallback, useState } from 'react';
import { Box, Input, Link } from '@chakra-ui/react';
import { SearchResult } from '../../utils/data';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isActive, setIsActive] = useState(false);
  const searchEndpoint = (query) => `/api/search?q=${query}`;

  const onChange = useCallback((e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 0) {
      fetch(searchEndpoint(searchQuery))
        .then((res) => res.json())
        .then((res) => res.results.map((r) => r.item))
        .then((res) => setResults(res));
    } else {
      setResults([]);
    }
  }, []);

  return (
    <Box mb={10} pos="relative" maxWidth="container.lg" mx="auto">
      <Input
        borderRadius={0}
        placeholder="Looking for something?"
        value={query}
        onChange={onChange}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      />
      {isActive && results.length > 0 && (
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
          {results.map((result) => (
            <Link
              display="block"
              key={`${result.calendar}/${result.post_year}/${result.post_day}`}
              href={`${result.calendar}/${result.post_year}/${result.post_day}`}
            >
              {result.title}
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Search;

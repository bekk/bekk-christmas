import React, { useState } from 'react';
import { Index } from 'elasticlunr';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { getCalendarPostLink } from '../utils';

const Input = styled.input`
    width: 100%;
    padding: 20px;
    font-size: 1.25rem;
    border: 1px solid gray;
`;

const SearchWrapper = styled.div`
    position: relative;
    max-width: 500px;
    width: 100%;
`;

const ResultList = styled.ul`
    position: absolute;
    width: 100%;
    padding: 20px;
    margin: 0;
    margin-top: -1px;
    list-style: none;
    border: 1px solid gray;
    background: white;

    &:empty {
        display: none;
    }

    & > * + * {
        margin-top: 0.5rem;
    }
`;

const ResultListItem = styled.li`
    font-size: 1.25rem;
`;

const Search = ({ searchIndex, isPreview }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    let index = Index.load(searchIndex);

    // Create an elastic lunr index and hydrate with graphql query results
    const getOrCreateIndex = () => (index ? index : Index.load(searchIndex));

    const search = (searchValue) => {
        index = getOrCreateIndex();
        setQuery(searchValue);
        // Query the index with search value to get list of IDs
        // Map over the IDs, return the full set of fields as specified in gatsby-config
        setResults(
            index
                .search(searchValue, { expand: true })
                .map(({ ref }) => index.documentStore.getDoc(ref))
        );
    };

    const loremipsumdolorsitamet = (
        <ResultList>
            {results.slice(0, 5).map((page) => {
                console.log(page);
                return (
                    <ResultListItem key={page.id}>
                        <Link
                            to={getCalendarPostLink(
                                isPreview,
                                page.calendar,
                                page.post_year,
                                page.post_day
                            )}
                        >
                            {page.title}
                        </Link>
                    </ResultListItem>
                );
            })}
        </ResultList>
    );

    return (
        <SearchWrapper>
            <Input
                placeholder="Søk etter en artikkel"
                value={query}
                onChange={(e) => search(e.target.value)}
            />
            {loremipsumdolorsitamet}
        </SearchWrapper>
    );
};

export default Search;

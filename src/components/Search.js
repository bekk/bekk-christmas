import React, { useState } from 'react';
import { Index } from 'elasticlunr';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { getCalendarPostLink } from '../utils';

const SearchWrapper = styled.div`
    position: relative;
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

const InputLabel = styled.label`
    display: block;
    height: 36px;
    font-size: 21px;
`;

const Input = styled.input`
    width: 100%;
    height: 70px;

    font-family: NewZaldBook;
    font-size: 47px;

    border: none;
    border-bottom: 2px solid var(--text-color);

    &:focus {
        border-color: var(--solnedgang);
        outline: none;
    }
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

    const resultList = (
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
            <InputLabel>Hva ser du etter?</InputLabel>
            <Input value={query} onChange={(e) => search(e.target.value)} />
            {resultList}
        </SearchWrapper>
    );
};

export default Search;

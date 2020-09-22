import React, { useState } from 'react';
import styled from 'styled-components';
import { Index } from 'elasticlunr';

import { CrossIcon, MagnifierIcon } from './Icons';
import ResultList from './ResultList';

const SearchWrapper = styled.div`
    position: relative;
`;

const SearchBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.95);
    z-index: 10;
    pointer-events: none;

    ${({ hidden }) =>
        hidden &&
        `
    background: none;
  `}
`;

const SearchForeground = styled.div`
    position: relative;
    z-index: 11;
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

    // I stor grad hentet fra pakkedokumentasjonen til gatsby-plugin-elasticlunr-search:
    // https://www.gatsbyjs.com/plugins/@gatsby-contrib/gatsby-plugin-elasticlunr-search/?=search#consuming-in-your-site

    // Create an elastic lunr index and hydrate with graphql query results
    const index = Index.load(searchIndex);

    const search = (searchValue) => {
        setQuery(searchValue);
        setResults(
            index
                // Query the index with search value to get list of IDs
                .search(searchValue, { expand: true })
                // Map over the IDs, return the full set of fields as specified in gatsby-config
                .map(({ ref }) => index.documentStore.getDoc(ref))
        );
    };

    return (
        <SearchWrapper>
            <SearchBackground hidden={!query} />
            <SearchForeground>
                <InputLabel>Hva ser du etter?</InputLabel>
                <Input value={query} onChange={(e) => search(e.target.value)} />
                {query ? <CrossIcon onClick={() => search('')} /> : <MagnifierIcon />}
                <ResultList results={results} isPreview={isPreview} />
            </SearchForeground>
        </SearchWrapper>
    );
};

export default Search;

import React, { useState } from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';

import { CrossIcon, MagnifierIcon } from './Icons';
import ResultList from './ResultList';
import { getSearchResultsLink, getSearchResults } from '../../utils';

const SearchWrapper = styled.div`
    position: relative;
`;

const SearchBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--primary-background-color);
    opacity: 0;
    z-index: 10;
    pointer-events: none;

    ${({ shown }) =>
        shown &&
        `
    opacity: 0.95;
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

const Search = ({ searchIndex, isPreview, searchValue = '', showAllResults = false }) => {
    const [query, setQuery] = useState(searchValue);
    const [results, setResults] = useState([]);
    const [focus, setFocus] = useState(false);

    const search = (searchValue) => {
        setQuery(searchValue);
        setResults(getSearchResults(searchValue, searchIndex));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            navigate(getSearchResultsLink(query));
            showAllResults && e.target.blur();
        }
    };

    const handleBlur = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setFocus(false);
        }
    };

    return (
        <SearchWrapper onBlur={(e) => handleBlur(e)} onFocus={() => setFocus(true)}>
            <SearchBackground shown={query && focus} />
            <SearchForeground>
                <InputLabel htmlFor="searchbar">Looking for a specific article?</InputLabel>
                <Input
                    id="searchbar"
                    value={query}
                    onChange={(e) => search(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e)}
                />
                {query ? <CrossIcon onClick={() => search('')} /> : <MagnifierIcon />}
                {focus && (
                    <ResultList
                        query={query}
                        results={results}
                        isPreview={isPreview}
                        showAllResults={showAllResults}
                    />
                )}
            </SearchForeground>
        </SearchWrapper>
    );
};

export default Search;

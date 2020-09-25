import React, { useState } from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';

import * as mediaQueries from '../../constants/media-queries';

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
    display: none;
    height: 36px;
    font-size: 21px;

    ${mediaQueries.mediumUp}  {
        display: block;
    }
`;

const Input = styled.input`
    width: 100%;
    height: 50px;

    font-family: NewZaldBook, serif;
    font-size: 18px;

    color: var(--text-color);
    background: transparent;
    border: none;
    border-bottom: 2px solid var(--text-color);

    &:focus {
        border-color: var(--solnedgang);
        outline: none;
    }

    ${mediaQueries.mediumUp} {
        height: 70px;
        font-size: 47px;

        &::placeholder {
            color: transparent;
        }
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

    const prompt = 'Looking for a specific article?';

    return (
        <SearchWrapper onBlur={(e) => handleBlur(e)} onFocus={() => setFocus(true)}>
            <SearchBackground shown={query && focus} />
            <SearchForeground>
                <InputLabel htmlFor="searchbar">{prompt}</InputLabel>
                <Input
                    id="searchbar"
                    placeholder={prompt}
                    value={query}
                    onChange={(e) => search(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e)}
                />
                {query ? <CrossIcon onClick={() => search('')} /> : <MagnifierIcon />}
                {focus && <ResultList query={query} results={results} isPreview={isPreview} />}
            </SearchForeground>
        </SearchWrapper>
    );
};

export default Search;

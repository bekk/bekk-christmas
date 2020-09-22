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

// Kopiert rett fra ansattlisten
const Cross = styled.svg`
    position: absolute;
    width: 16px;
    height: 16px;
    padding: 10px;
    right: 15px;
    top: 71px;
    transform: translateY(-50%);
    stroke: var(--text-color);
    stroke-linecap: square;
    stroke-width: 1.6;
    box-sizing: content-box;
    cursor: pointer;
`;

const CrossIcon = (args) => (
    <Cross xmlns="http://www.w3.org/2000/svg" {...args}>
        <path d="M14.74 1.26L1.22 14.78M1.26 1.26l13.52 13.52"></path>
    </Cross>
);

const Magnifier = styled.svg`
    position: absolute;
    width: 39px;
    height: 39px;
    right: 0;
    top: 71px;
    transform: translateY(-50%);

    path {
        fill: var(--text-color);
    }
`;

const MagnifierIcon = () => (
    <Magnifier xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(-6.000000, -5.000000)">
            <path
                d="M30.6656798,26.2390203 L50.8703704,26.2390203 L50.8703704,27.2609797 L30.6656798,27.2609797 C30.3951917,34.6181573 24.3076219,40.5 16.8375289,40.5 C9.19527273,40.5 3,34.3439153 3,26.75 C3,19.1560847 9.19527273,13 16.8375289,13 C24.3076219,13 30.3951917,18.8818427 30.6656798,26.2390203 Z M16.8375289,39.5244932 C23.937598,39.5244932 29.6933413,33.8051578 29.6933413,26.75 C29.6933413,19.6948422 23.937598,13.9755068 16.8375289,13.9755068 C9.73745983,13.9755068 3.98171658,19.6948422 3.98171658,26.75 C3.98171658,33.8051578 9.73745983,39.5244932 16.8375289,39.5244932 Z"
                transform="translate(26.935185, 26.750000) rotate(-315.000000) translate(-26.935185, -26.750000) "
            ></path>
        </g>
    </Magnifier>
);

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
            {query ? <CrossIcon onClick={() => search('')} /> : <MagnifierIcon />}
            {resultList}
        </SearchWrapper>
    );
};

export default Search;

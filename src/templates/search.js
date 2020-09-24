import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Link } from 'gatsby';

import * as mediaQueries from '../constants/media-queries';

import GlobalStyles from '../components/GlobalStyles';
import Search from '../components/search/Search';

import ogImageSrc from '../images/teaser-1.jpg';
import { setImageWidth, mapCalendarToName, getCalendarPostLink, getSearchResults } from '../utils';

const SearchLayout = styled.main`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    max-width: 750px;
    margin: 0 auto;

    padding: 50px 20px;

    ${mediaQueries.smallUp}  {
        padding: 75px 20px;
    }

    ${mediaQueries.mediumUp}  {
        padding: 100px 20px 50px;
    }

    ${mediaQueries.largeUp}  {
        padding: 100px 20px 50px;
    }
`;

const SearchResult = styled.article`
    margin-top: 50px;

    a {
        text-decoration: underline;
        font-size: 1.5em;
        line-height: 140%;
    }
`;

const SearchResultInfo = styled.div`
    display: flex;
    justify-content: space-between;
`;

const useQueryParams = () => {
    const [queryParams, setQueryParams] = useState('');

    useEffect(() => {
        setQueryParams(decodeURI(window.location.search).slice(1));
    });

    return queryParams;
};

const SearchResultsPage = ({ pageContext }) => {
    const isPreview = pageContext.isPreview;
    const searchIndex = pageContext.siteSearchIndex.index;

    const query = useQueryParams();

    return (
        <SearchLayout>
            <GlobalStyles />
            <Helmet>
                <html lang="en" />
                <title>Bekk Christmas</title>
                <meta
                    property="description"
                    content="Bekk is getting in the Christmas spirit with 24 days of articles"
                />
                <meta property="og:title" content="Bekk Christmas" />
                <meta
                    property="og:description"
                    content="Bekk is getting in the Christmas spirit with 24 days of articles"
                />
                <meta property="og:image" content={ogImageSrc} />
            </Helmet>
            <Search
                searchIndex={searchIndex}
                isPreview={pageContext.isPreview}
                searchValue={query}
                showAllResults={true}
            />
            <SearchResults
                pages={getSearchResults(query, searchIndex)}
                query={query}
                isPreview={isPreview}
            />
        </SearchLayout>
    );
};

const SearchResults = ({ pages, query, isPreview }) => {
    if (pages.length === 0) {
        return <p>No results found for "{query}".</p>;
    }

    return pages.map((page) => (
        <SearchResult key={page.id}>
            <SearchResultInfo>
                <p>{page.authors.join(', ')}</p>
                <p>
                    {mapCalendarToName(page.calendar)} {page.post_year}, day {page.post_day}
                </p>
            </SearchResultInfo>
            <Link to={getCalendarPostLink(isPreview, page.calendar, page.post_year, page.post_day)}>
                {page.image && <img src={setImageWidth(page.image)} />}
                {page.title}
            </Link>
            <p>{page.ingress}</p>
        </SearchResult>
    ));
};

export default SearchResultsPage;

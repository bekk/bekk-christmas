import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Link } from 'gatsby';

import Layout from '../components/Layout';
import Search from '../components/search/Search';

import ogImageSrc from '../images/teaser-1.jpg';
import { setImageWidth, mapCalendarToName, getCalendarPostLink, getSearchResults } from '../utils';

const SearchWrapper = styled.div`
    padding: 0 10px;
    max-width: 750px;
    margin: 100px auto;
`;

const SearchResults = styled.main`
    padding: 0 10px;
    max-width: 750px;
    margin: 0 auto;
`;

const SearchResultItem = styled.article`
    a {
        text-decoration: underline;
        font-size: 1.5em;
        line-height: 140%;
    }

    & + & {
        margin-top: 100px;
    }
`;

const SearchResultItemMeta = styled.div`
    display: flex;
    justify-content: space-between;
`;

const SearchResultsPage = ({ data, pageContext }) => {
    const queryParams = window.location.search;
    const query = decodeURI(queryParams).slice(1);

    const isPreview = pageContext.isPreview;
    const searchIndex = pageContext.siteSearchIndex.index;

    return (
        <Layout>
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
            <SearchWrapper>
                <Search
                    searchIndex={searchIndex}
                    isPreview={pageContext.isPreview}
                    searchValue={query}
                    showAllResults={true}
                />
            </SearchWrapper>
            <SearchResults>
                {getSearchResults(query, searchIndex).map((page) => (
                    <SearchResultItem key={page.id}>
                        <SearchResultItemMeta>
                            <p>{page.authors.join(', ')}</p>
                            <p>
                                {mapCalendarToName(page.calendar)} {page.post_year}, Day{' '}
                                {page.post_day}
                            </p>
                        </SearchResultItemMeta>
                        <Link
                            to={getCalendarPostLink(
                                isPreview,
                                page.calendar,
                                page.post_year,
                                page.post_day
                            )}
                        >
                            {page.image && <img src={setImageWidth(page.image)} />}
                            {page.title}
                        </Link>
                        <p>{page.ingress}</p>
                    </SearchResultItem>
                ))}
            </SearchResults>
        </Layout>
    );
};

export default SearchResultsPage;

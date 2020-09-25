import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import striptags from 'striptags';
import styled from 'styled-components';
import GlobalStyles from '../components/GlobalStyles';
import Search from '../components/search/Search';
import * as mediaQueries from '../constants/media-queries';
import ogImageSrc from '../images/teaser-1.jpg';
import { getCalendarPostLink, getSearchResults, mapCalendarToName, setImageHeight } from '../utils';

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

const FrontpageLink = styled(Link)`
    display: none;
    position: absolute;
    top: 50px;
    right: 50px;
    font-size: 20px;

    ${mediaQueries.largeUp}  {
        display: block;
    }
`;

const SearchResult = styled.article`
    margin-top: 50px;

    ${mediaQueries.smallUp}  {
        margin-top: 75px;
    }

    a {
        text-decoration: none;
        transition: color 0.2s;

        img {
            transition: transform 0.2s;
        }

        &:hover {
            color: var(--solnedgang-kontrast);

            img {
                transform: scale(1.05);
            }
        }
    }
`;

const SearchResultImageWrapper = styled.div`
    overflow: hidden;
    max-height: 300px;
`;

const SearchResultTitle = styled.p`
    font-size: 2rem;
    font-family: NewZaldBook, serif;
    margin: 1rem 0;
`;

const SearchResultIngress = styled.p`
    position: relative;
    font-size: 16px;
    line-height: 1.4;
    /* Line height * font-size * 3 lines of text */
    max-height: 67.2px;
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        /* Fade out the last line of text */
        height: 22.4px;
        width: 100%;
        left: 0;
        top: 44.8px;
        background: linear-gradient(120deg, transparent 0%, var(--primary-background-color) 50%);
    }

    &:empty {
        display: none;
    }
`;

const SearchResultInfo = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    p {
        margin: 0;
    }
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
            <FrontpageLink to="/">Go back</FrontpageLink>
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
            <Link to={getCalendarPostLink(isPreview, page.calendar, page.post_year, page.post_day)}>
                {page.image && (
                    <SearchResultImageWrapper>
                        <img src={setImageHeight(page.image)} />
                    </SearchResultImageWrapper>
                )}
                <SearchResultTitle>{page.title}</SearchResultTitle>
            </Link>
            <SearchResultIngress>{striptags(page.ingress)}</SearchResultIngress>
            <SearchResultInfo>
                <p>{page.authors.join(', ')}</p>
                <p>
                    {mapCalendarToName(page.calendar)} {page.post_year}, day {page.post_day}
                </p>
            </SearchResultInfo>
        </SearchResult>
    ));
};

export default SearchResultsPage;

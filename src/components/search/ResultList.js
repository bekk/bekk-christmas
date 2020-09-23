import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { getCalendarPostLink, getSearchResultsLink } from '../../utils';

const ResultListContainer = styled.div`
    position: absolute;
    width: 100%;
    transform: translateY(15px);
    font-size: 21px;
`;

const ResultListItems = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;

    &:empty {
        display: none;
    }
`;

const ResultListItem = styled.li`
    padding: 7px 0;
    a {
        text-decoration: none;
        &:hover {
            font-weight: bold;
        }
    }
`;

const QueryLink = styled(Link)`
    display: block;
    margin-top: 15px;
    text-decoration: underline;
`;

const ResultList = ({ query, results, isPreview, showAllResults }) => (
    <ResultListContainer>
        <ResultListItems>
            {results.slice(0, 10).map((page) => {
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
        </ResultListItems>
        {query && !showAllResults && (
            <QueryLink to={getSearchResultsLink(query)}>Show all results for "{query}"</QueryLink>
        )}
    </ResultListContainer>
);

export default ResultList;

import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { getCalendarPostLink } from '../../utils';

const ResultListItems = styled.ul`
    position: absolute;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    transform: translateY(15px);

    &:empty {
        display: none;
    }
`;

const ResultListItem = styled.li`
    font-size: 21px;
    padding: 7px 0;
    a {
        text-decoration: none;
        &:hover {
            font-weight: bold;
        }
    }
`;

const ResultList = ({ results, isPreview }) => (
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
);

export default ResultList;

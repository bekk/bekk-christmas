import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const MarginTop = styled.div`
    margin-top: 100px;
`;

const Preview = ({ calendarsWithContent }) => {
    if (calendarsWithContent == null || calendarsWithContent.length === 0) {
        return null;
    }

    return (
        <MarginTop>
            <h2>Only visible in preview - all available calendars</h2>
            <ul>
                {calendarsWithContent.map(link => (
                    <li key={link}>
                        <Link to={link}>{link}</Link>
                    </li>
                ))}
            </ul>
        </MarginTop>
    );
};

export default Preview;

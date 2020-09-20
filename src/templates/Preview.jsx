import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'gatsby';

const Container = styled.div`
    margin: 300px auto 50px;
    max-width: 800px;
`;

const Preview = ({ calendarsWithContent }) => {
    if (calendarsWithContent == null || calendarsWithContent.length === 0) {
        return null;
    }

    const calendarsWithInfo = calendarsWithContent.map((link) => {
        const [, name, year] = link.split('/');
        return { link, name, year };
    });

    return (
        <Container>
            <h2>Only visible in preview - all available calendars</h2>
            <ul css="columns: 2">
                {calendarsWithInfo.map(({ link, name, year }) => (
                    <li key={link}>
                        <Link to={link}>
                            {name} ({year})
                        </Link>
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default Preview;

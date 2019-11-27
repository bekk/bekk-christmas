import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Container = styled.section`
    margin: 1em 0;
    padding: 1em 0;
    border-top: 1px solid currentColor;
`;

const getYearLinkAndDescription = path => {
    if (path.endsWith('2017')) {
        return <Link to={path}>2017's</Link>;
    }
    if (path.endsWith('2018')) {
        return <Link to={path}>last year's</Link>;
    }
    return <Link to={path}>this year's</Link>;
};

export const RelatedCalendars = ({ paths }) => {
    if (!paths.length) {
        return null;
    }

    const [yearOne, yearTwo] = paths;

    return (
        <Container>
            Want more? Check out {getYearLinkAndDescription(yearOne)}{' '}
            {yearTwo && <>and {getYearLinkAndDescription(yearTwo)}</>} calendar{yearTwo ? 's' : ''}!
        </Container>
    );
};

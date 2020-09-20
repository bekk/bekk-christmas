import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Container = styled.section`
    margin: 1em 0;
    padding: 1em 0;
    border-top: 1px solid currentColor;
`;

export const RelatedCalendars = ({ paths }) => {
    if (!paths.length) {
        return null;
    }

    return (
        <Container>
            Want more? Check out the calendar{paths.length > 1 && 's'} from{' '}
            {paths.map((path, index) => (
                <>
                    {index === paths.length - 1 && ' and '}
                    <Link key={path} to={path}>
                        {path.split('/').pop()}
                    </Link>
                    {index < paths.length - 2 && ', '}
                </>
            ))}
        </Container>
    );
};

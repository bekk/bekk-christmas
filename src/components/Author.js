import React, { Fragment } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    text-align: center;
`;

const AuthorText = styled.p`
    line-height: 1.5;
`;

const AuthorInfo = props => {
    const { authors, readingTime, calendar } = props;
    if (!authors || !authors.length) {
        return null;
    }

    const showReadingTime = calendar !== 'product';

    return (
        <Container>
            <AuthorText>
                {showReadingTime ? `A ${readingTime} minute read written by` : 'Created by'}
                <br />
                {authors.map((author, index) => (
                    <Fragment key={author.title}>
                        <strong>{author.title}</strong>
                        {author.company ? ` (${author.company})` : ''}
                        {index < authors.length - 2 && ', '}
                        {index === authors.length - 2 && ' and '}
                    </Fragment>
                ))}
            </AuthorText>
        </Container>
    );
};

export default AuthorInfo;

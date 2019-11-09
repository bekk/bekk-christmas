import React, { Fragment } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    text-align: center;
`;

const AuthorText = styled.p`
    line-height: 1.5;
`;

const Avatar = styled.div`
    background: #eee url(${props => props.src}) center center no-repeat;
    background-size: cover;
    display: block;
    margin: 0 10px;
    border-radius: 50%;
    width: 100px;
    height: 100px;
`;

const AuthorInfo = props => {
    const { authors, readingTime } = props;
    if (!authors || !authors.length) {
        return null;
    }
    return (
        <Container>
            <AuthorText>
                A {readingTime} minute read written by <br />
                {authors.map((author, index) => (
                    <Fragment key={author.title}>
                        <strong>{author.title}</strong>
                        {index < authors.length - 2 && ', '}
                        {index === authors.length - 2 && ' and '}
                    </Fragment>
                ))}
            </AuthorText>
        </Container>
    );
};

export default AuthorInfo;

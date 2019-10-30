import React, { Fragment } from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';

const Container = styled.div`
    text-align: center;
`;

const AvatarContainer = styled.div`
    display: flex;
    justify-content: center;
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

    const data = useStaticQuery(graphql`
        query {
            images: allFile {
                edges {
                    node {
                        relativePath
                        name
                        childImageSharp {
                            fluid(maxWidth: 600) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            }
        }
    `);

    console.log(data);

    if (!authors || !authors.length) {
        return null;
    }
    return (
        <Container>
            <AvatarContainer>
                {authors.map(author => {
                    let imgSrc = author.avatar;
                    data.images.edges.forEach(image => {
                        if (author.avatar.includes(image.node.relativePath)) {
                            imgSrc = image.node.childImageSharp.fluid.src;
                        }
                    });

                    return <Avatar key={author.title} src={imgSrc} alt={author.title} />;
                })}
            </AvatarContainer>
            <AuthorText>
                A {readingTime} written by <br />
                {authors.map((author, index) => (
                    <Fragment key={author.title}>
                        <strong>{author.title}</strong>
                        {index < authors.length - 1 && ' and '}
                    </Fragment>
                ))}
            </AuthorText>
        </Container>
    );
};

export default AuthorInfo;

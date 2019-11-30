import React, { Fragment } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    text-align: center;
`;

const AuthorText = styled.p`
    line-height: 1.5;
`;

const AuthorLink = styled.a(
    ({ theme }) => `
    color: ${theme.textColor};
    font-weight: bolder;
`
);

const enhancedLinkGuesser = link => {
    if (!link) {
        return null;
    }
    if (link.startsWith('http') || link.startsWith('mailto:')) {
        // assume the user knows what they're doing
        return link;
    }

    if (link.startsWith('@')) {
        // assume twitter
        return `https://twitter.com/${link}`;
    }

    if (link.endsWith('@bekk.no')) {
        // assume bekk email
        return `mailto:${link}`;
    }

    // deep learning failed, return the default
    return link;
};

const AuthorInfo = props => {
    const { authors, readingTime, calendar, year, day } = props;
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
                        {author.socialMediaLink ? (
                            <AuthorLink
                                target="_blank"
                                href={enhancedLinkGuesser(author.socialMediaLink)}
                            >
                                {author.title}
                            </AuthorLink>
                        ) : (
                            <strong>{author.title}</strong>
                        )}
                        {author.company && author.company !== 'Bekk' && ` (${author.company})`}
                        {index < authors.length - 2 && ', '}
                        {index === authors.length - 2 && ' and '}
                    </Fragment>
                ))}
                <br />
                {`${day.toString().padStart(2, '0')}.12.${year}`}
            </AuthorText>
        </Container>
    );
};

export default AuthorInfo;

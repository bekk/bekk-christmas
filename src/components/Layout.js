import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import * as mediaQueries from '../constants/media-queries';
import { mapCalendarToName } from '../utils';
import { ThemeProvider } from './ThemeContext';
import GlobalStyles from './GlobalStyles';
import Tre from './Tre';
import { SkipToContent, MainContentWrapper } from './SkipToContent';
import Footer from './Footer';

const Container = styled.div(
    ({ theme }) => `
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    .dark-theme-image {
        display: ${theme.darkThemeImageDisplay};
    }
    .light-theme-image {
        display: ${theme.lightThemeImageDisplay};
    }
`
);

const MainContent = styled(MainContentWrapper)`
    flex: 1;
    width: 100%;
    max-width: 1600px;
    padding: 10px;
    margin: 0 auto;

    .wide-image {
        width: 100%;
        height: 400px;
        object-fit: cover;
    }

    ${mediaQueries.mediumUp}  {
        padding: 15px;
    }
`;

const Header = styled.header`
    margin: 50px 20px;
`;

const CalendarName = styled.h1`
    margin-left: 16px;
    font-size: 2.5em;
    font-weight: 400;
`;

const StyledLink = styled(Link)`
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;

    &:visited  {
        color: inherit;
    }
`;

const Layout = ({ calendarName, children }) => {
    const calendarTitle = mapCalendarToName(calendarName);
    return (
        <ThemeProvider>
            <SkipToContent />
            <Container>
                <GlobalStyles />
                {calendarTitle && (
                    <Header>
                        <StyledLink to="/">
                            <Tre />
                            <CalendarName>{calendarTitle} Christmas</CalendarName>
                        </StyledLink>
                    </Header>
                )}
                <MainContent>{children}</MainContent>
            </Container>
            <Footer calendarName={calendarName} />
        </ThemeProvider>
    );
};

export default Layout;

import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { mapCalendarToName } from '../utils';
import { ThemeProvider } from './ThemeContext';
import GlobalStyles from './GlobalStyles';
import Tre from './Tre';
import { SkipToContent, MainContentWrapper } from './SkipToContent';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const MainContent = styled(MainContentWrapper)`
    flex: 1;
    width: 100%;
    max-width: 1258px;
    padding: 30px;
    margin: 0 auto;
`;

const Header = styled.header`
    margin: 50px 20px;
`;

const CalendarName = styled.div`
    margin-left: 16px;
    font-size: 40px;
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
    const isOnCalendarPage =
        window.location.pathname === `/${calendarName}` ||
        window.location.pathname === `/${calendarName}/`;
    return (
        <ThemeProvider>
            <SkipToContent />
            <Container>
                <GlobalStyles />
                {calendarTitle && (
                    <Header>
                        <StyledLink to={isOnCalendarPage ? '/' : `/${calendarName}`}>
                            <Tre />
                            <CalendarName>{calendarTitle}</CalendarName>
                        </StyledLink>
                    </Header>
                )}
                <MainContent>{children}</MainContent>
            </Container>
        </ThemeProvider>
    );
};

export default Layout;

import React from 'react';
import styled from 'styled-components';

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
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
    }
    h1 {
        margin-left: 16px;
        font-weight: normal;
        font-size: 40px;
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
                        <Tre />
                        <h1>{calendarTitle}</h1>
                    </Header>
                )}
                <MainContent>{children}</MainContent>
            </Container>
        </ThemeProvider>
    );
};

export default Layout;

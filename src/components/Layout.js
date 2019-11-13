import React from 'react';
import styled from 'styled-components';

import { mapCalendarToName } from '../utils';
import GlobalStyles from './GlobalStyles';
import Tre from './Tre';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const MainContent = styled.main`
    flex: 1;
    width: 100%;
    max-width: 1000px;
    padding: 30px;
    margin: 0 auto;
`;

const Header = styled.header`
    margin: 50px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        margin-top: 50px;
        margin-bottom: 50px;

        font-weight: normal;
        font-size: 24px;
    }
`;

const Layout = ({ calendarName, children }) => {
    const calendarTitle = mapCalendarToName(calendarName);
    return (
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
    );
};

export default Layout;

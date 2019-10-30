import React from 'react';
import styled from 'styled-components';

import GlobalStyles from './GlobalStyles';
import Top from './Top';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;
const MainContent = styled.main`
    flex: 1;
`;

const Layout = props => {
    return (
        <Container>
            <GlobalStyles />
            <Top calendar={props.calendar} />
            <MainContent>{props.children}</MainContent>
        </Container>
    );
};

export default Layout;

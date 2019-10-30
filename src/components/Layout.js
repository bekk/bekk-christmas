import React from 'react';
import styled from 'styled-components';

import GlobalStyles from './GlobalStyles';

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
            <MainContent>{props.children}</MainContent>
        </Container>
    );
};

export default Layout;

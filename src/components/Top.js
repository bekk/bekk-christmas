import React from 'react';
import styled from 'styled-components';
import Tre from './Tre';

const Container = styled.div`
    margin: 50px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Text = styled.h1`
    margin-top: 50px;
    margin-bottom: 50px;

    font-weight: normal;
    font-size: 24px;
`;

const mapCalendarToName = calendar => {
    switch (calendar) {
        case 'javascript':
            return 'JavaScript Christmas';
        case 'kotlin':
            return 'Kotlin Christmas';
        case 'react':
            return 'React Christmas';
        case 'opensource':
            return 'Open source Christmas';
        default:
            return 'Bekk Christmas';
    }
};

export default ({ calendar }) => (
    <Container>
        <Tre />
        <Text>{mapCalendarToName(calendar)}</Text>
    </Container>
);

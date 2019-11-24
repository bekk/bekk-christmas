import React from 'react';
import styled from 'styled-components';

const Number = styled.span(
    ({ theme }) => `
    color: ${theme.textColor};
    margin: 0;
    padding: 0;
    font-size: 48px;
`
);

const WindowClosed = styled.div(
    ({ theme }) => `
    border: 1px solid ${theme.textColor};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`
);

const CalendarWindowClosed = ({ day, ...rest }) => {
    return (
        <WindowClosed {...rest} aria-label={`Day ${day} is not yet available`}>
            <Number>{day}</Number>
        </WindowClosed>
    );
};

export default CalendarWindowClosed;

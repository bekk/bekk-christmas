import React from 'react';
import styled from 'styled-components';

const Number = styled.span`
    color: black;
    margin: 0;
    padding: 0;
    font-size: 48px;
`;

const WindowClosed = styled.div`
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 33px);
`;

const CalendarWindowClosed = ({ day }) => {
    return (
        <WindowClosed>
            <Number>{day}</Number>
        </WindowClosed>
    );
};

export default CalendarWindowClosed;

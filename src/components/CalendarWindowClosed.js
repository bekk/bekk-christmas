import React from 'react';
import styled from 'styled-components';
import CalendarWindowWrapper from './CalendarWindowWrapper';

const Number = styled.span`
    color: var(--text-color)
    margin: 0;
    padding: 0;
    font-size: 3em;
`;

const WindowClosed = styled.div`
    border: 1px solid var(--text-color);
    display: flex;
    justify-content: center;
    align-items: center;

    &:after {
        content: '';
        display: block;
        padding-bottom: 100%;
    }
`;

const CalendarWindowClosed = ({ day }) => {
    return (
        <CalendarWindowWrapper>
            <WindowClosed aria-label={`Day ${day} is not yet available`}>
                <Number>{day}</Number>
            </WindowClosed>
        </CalendarWindowWrapper>
    );
};

export default CalendarWindowClosed;

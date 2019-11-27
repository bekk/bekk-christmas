import React from 'react';
import styled from 'styled-components';

const Number = styled.span(
    ({ theme }) => `
    color: ${theme.textColor};
    margin: 0;
    padding: 0;
    font-size: 3em;
`
);

const WindowClosed = styled.div(
    ({ theme }) => `
    border: 1px solid ${theme.textColor};
    display: flex;
    justify-content: center;
    align-items: center;

    &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }
`
);

const CalendarWindowClosed = ({ day, ...rest }) => {
    return (
        <div>
            <WindowClosed aria-label={`Day ${day} is not yet available`}>
                <Number>{day}</Number>
            </WindowClosed>
        </div>
    );
};

export default CalendarWindowClosed;

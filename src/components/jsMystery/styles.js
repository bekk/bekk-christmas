import styled from 'styled-components/macro';

export const MaxWidth = styled.div`
    max-width: 760px;
    margin: auto;
`;

export const BorderButton = styled.button`
    font-size: 22px;
    font-family: inherit;
    color: var(--text-color);

    background: transparent;
    outline: 0;
    border: 1px solid;
    cursor: pointer;

    margin: 0;
    margin-bottom: 30px;
    margin-right: auto;
    padding: 15px 30px;

    &:focus,
    &:hover {
        background: var(--text-color);
        color: var(--primary-background-color);
    }
`;

export const Icon = styled.img`
    position: absolute;
    top: -30px;
    right: -30px;
    margin: 0px !important;
    height: 90px;
    width: 90px !important;
`;

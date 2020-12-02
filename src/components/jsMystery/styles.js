import styled from 'styled-components/macro';

export const MaxWidth = styled.div`
    max-width: 760px;
    margin: auto;
`;

export const BorderButton = styled.button`
    font-size: 22px;
    font-family: inherit;
    color: black;

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
        background: black;
        color: white;
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

export const TransparentButton = styled.button`
    background: transparent;
    padding: 0px;
    margin: 0px;
    outline: none;
    border: none;
    cursor: pointer;
`;

import styled from 'styled-components';

export default styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px;
    grid-auto-rows: 1fr;
    list-style: none;
    padding: 0;
`;

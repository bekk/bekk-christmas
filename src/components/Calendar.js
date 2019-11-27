import styled from 'styled-components';
import * as mediaQueries from '../constants/media-queries';

export default styled.ul`
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(1, 1fr);
    list-style: none;
    padding: 0;

    ${mediaQueries.smallUp}  {
        gap: 30px;
        grid-template-columns: repeat(2, 1fr);
    }

    ${mediaQueries.mediumUp}  {
        grid-template-columns: repeat(3, 1fr);
    }

    ${mediaQueries.largeUp}  {
        grid-template-columns: repeat(4, 1fr);
    }
`;

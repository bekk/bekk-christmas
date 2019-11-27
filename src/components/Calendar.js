import styled from 'styled-components';
import * as mediaQueries from '../constants/media-queries';

export default styled.ul`
    display: grid;
    grid-template-columns: 1fr;
    list-style: none;
    padding: 0;

    ${mediaQueries.smallUp}  {
        grid-template-columns: 1fr 1fr;
    }

    ${mediaQueries.mediumUp}  {
        grid-template-columns: 1fr 1fr 1fr;
    }

    ${mediaQueries.largeUp}  {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`;

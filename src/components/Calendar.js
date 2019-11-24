import styled from 'styled-components';
import * as mq from '../constants/media-queries';

export default styled.ul`
    display: grid;
    gap: 30px;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 1fr;
    list-style: none;
    padding: 0;

    ${mq.mediumUp}  {
        grid-template-columns: repeat(4, 1fr);
    }
`;

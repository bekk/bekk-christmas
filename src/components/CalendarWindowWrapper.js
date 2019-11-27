import styled from 'styled-components';
import * as mediaQueries from '../constants/media-queries';

export default styled.div`
    padding: 10px;

    ${mediaQueries.mediumUp} {
        padding: 15px;
    }
`;

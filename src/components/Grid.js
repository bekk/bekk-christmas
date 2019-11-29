import styled from 'styled-components';
import * as mediaQueries from '../constants/media-queries';

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 17px;
    grid-row-gap: 40px;
    max-width: 1680px;
    margin: 0 auto;
    padding: 0 1.5em;
    width: 100%;
    ${mediaQueries.mediumUp} {
        grid-template-columns: repeat(12, 1fr);
        grid-column-gap: 73.3px;
        grid-row-gap: 60px;
        padding: 0;
    }
`;

export const GridContent = styled.div`
  grid-column: ${props => props.sm || '1 / span 12'};
  justify-self: ${props => props.align || 'start'};
  ${props =>
      props.md &&
      `
    ${mediaQueries.mediumUp} {
      grid-column: ${props.md};
    }
  `}
  ${props =>
      props.alignMd &&
      `
  ${mediaQueries.mediumUp} { 
      justify-self: ${props.alignMd}; 
    }
  `}
  ${props =>
      props.lg &&
      `
    ${mediaQueries.mediumUp} {
      grid-column: ${props.lg};
    }
  `}
  ${props =>
      props.xl &&
      `
    ${mediaQueries.mediumUp} {
      grid-column: ${props.xl};
    }
  `}
`;

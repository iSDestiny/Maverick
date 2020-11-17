import styled from 'styled-components';

export const FlexItem = styled.div`
    flex: ${({ flexGrow }) => (flexGrow ? flexGrow : 0)};
    flex-basis: 100%;
`;

export const FlexContainer = styled.div`
    /* height: 100%; */
    height: ${({ height }) => height};
    width: ${({ width }) => (width ? width : '100%')};
    min-width: ${({ minWidth }) => minWidth};
    max-width: ${({ maxWidth }) => maxWidth};
    padding: ${({ padding }) => padding};
    display: flex;
    flex-direction: ${({ direction }) => (direction ? direction : 'row')};
    justify-content: ${({ justify }) => justify};
    align-items: ${({ alignItems }) => alignItems};
`;

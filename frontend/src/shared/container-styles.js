import styled from 'styled-components';

export const FlexItem = styled.div`
    flex: ${({ flexGrow }) => (flexGrow ? flexGrow : 0)};
    flex-basis: 100%;
`;

export const FlexContainer = styled.div`
    /* height: 100%; */
    width: 100%;
    display: flex;
    flex-direction: ${({ direction }) => (direction ? direction : 'row')};
    justify-content: ${({ justify }) => justify};
    align-items: ${({ alignItems }) => alignItems};
`;

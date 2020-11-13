import styled from 'styled-components';
import { Paper } from '@material-ui/core';
import { FlexItem } from '../../shared/container-styles';

export const InputGroup = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
`;

export const Input = styled.div`
    flex: ${({ flexGrow }) => (flexGrow ? flexGrow : 1)};
    flex-basis: ${({ flexBasis }) => flexBasis};
    padding: 0 1rem;
    width: 100%;
    margin-left: ${({ autoLeft }) => autoLeft && 'auto'};
    margin-right: ${({ autoRight }) => autoRight && 'auto'};
`;

export const MyPaper = styled(Paper)`
    padding: 1.5rem 2rem;
    height: 100%;
    width: 100%;
`;

import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export const DoorText = styled.span`
    color: #ff9900;
`;
export const OutboundBodyText = styled(Typography)`
    font-size: 3rem;
`;

export const InboundBodyText = styled(Typography)`
    font-size: 4rem;
`;

export const Dot = styled.span`
    height: 1rem;
    width: 1rem;
    background-color: green;
    border-radius: 50%;
    display: inline-block;
`;

export const MainHeaderText = styled(Typography)`
    font-size: 6rem;
`;

export const Container = styled.div`
    padding: 2rem 4rem;
    padding-bottom: 0rem;
    height: 100vh;
`;

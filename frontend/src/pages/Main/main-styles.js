import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export const DoorText = styled.span`
    color: #ff9900;
`;
export const OutboundBodyText = styled(Typography)`
    font-size: 7rem;
    font-weight: bold;
`;

export const InboundBodyText = styled(Typography)`
    font-size: 8rem;
    font-weight: bold;
`;

export const Dot = styled.span`
    height: 2rem;
    width: 2rem;
    background-color: green;
    border-radius: 50%;
    display: inline-block;
`;

export const MainHeaderText = styled(Typography)`
    font-size: 6rem;
    font-weight: bold;
`;

export const Container = styled.div`
    padding: 1rem 4rem;
    height: 100vh;
`;

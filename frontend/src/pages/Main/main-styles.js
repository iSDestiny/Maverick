import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export const DoorText = styled.span`
    color: #ff9900;
`;

export const OutboundBodyText = styled(Typography)`
    font-size: 6rem;
    font-weight: bold;
    text-align: left;
`;

export const InboundBodyText = styled(Typography)`
    padding: 0 2rem;
    font-size: 7rem;
    font-weight: bold;
`;

export const Dot = styled.span`
    height: 2rem;
    width: 2rem;
    background-color: green;
    border-radius: 50%;
    display: inline-block;
    visibility: ${(props) => props.visibility};
`;

export const MainHeaderText = styled(Typography)`
    font-size: 6rem;
    font-weight: bold;
    text-decoration: underline;
    font-family: Impact, Charcoal, sans-serif;
`;

export const Container = styled.div`
    padding: 1rem 1rem;
    padding-bottom: 0rem;
    height: 95vh;
`;

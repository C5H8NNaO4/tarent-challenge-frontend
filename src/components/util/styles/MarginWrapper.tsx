import { styled } from '@mui/material';

export const MarginWrapper = styled('div')`
    margin-left: ${(p: { ml: number }) => p.ml || 0}px;
`;

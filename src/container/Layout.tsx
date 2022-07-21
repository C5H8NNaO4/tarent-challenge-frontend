import { FunctionComponent } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import { Header } from './Header';
import { Routes } from './Routes';
import { ErrorBoundary } from '../components/ErrorBoundary';

export const DefaultLayout: FunctionComponent = () => {
    return (
        <Paper square sx={{ height: '100%', minHeight: '100vh' }}>
            <Header />
            <Router>
                <ErrorBoundary>
                    <Box sx={{ margin: 1 }}>
                        <Routes />
                    </Box>
                </ErrorBoundary>
            </Router>
        </Paper>
    );
};

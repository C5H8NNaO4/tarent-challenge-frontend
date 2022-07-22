import { LinearProgress } from '@mui/material';
import { FunctionComponent } from 'react';

import { AddTrainingFAB } from '../components/AddTrainingFAB';
import { AppSnackBar } from '../components/AppSnackBar';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { TrainingGrid } from '../components/trainings/TrainingGrid';
import { useTrainings } from '../lib/data';

export const DemoPage: FunctionComponent = () => {
    const { loading, data } = useTrainings();

    return (
        <ErrorBoundary>
            {loading && <LinearProgress variant="indeterminate" />}
            <TrainingGrid data={data} />
            <AppSnackBar />
            <AddTrainingFAB />
        </ErrorBoundary>
    );
};

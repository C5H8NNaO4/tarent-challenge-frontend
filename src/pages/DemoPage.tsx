import { LinearProgress } from '@mui/material';
import { FunctionComponent, useContext } from 'react';

import { ErrorBoundary } from '../components/ErrorBoundary';
import { TrainingCardProps } from '../components/trainings/TrainingCard';
import { TrainingGrid } from '../components/trainings/TrainingGrid';
import { AppSnackBar } from '../components/AppSnackBar';
import { useTrainings } from '../lib/data';
import { useRestoreSession } from '../lib/session';
import { stateContext } from '../provider/StateProvider';
import { AddTrainingFAB } from '../components/AddTrainingFAB';

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

import { Alert, AlertColor, Snackbar } from '@mui/material';
import { useContext } from 'react';

import { HideToast } from '../lib/actions';
import { stateContext } from '../provider/StateProvider';

export const AppSnackBar = () => {
    const { state, dispatch } = useContext(stateContext);

    const firstToast = state.toasts.slice(0, 1)[0];
    const { type, message } = firstToast || {};

    const handleClose = () => {
        dispatch(HideToast(firstToast));
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={Boolean(firstToast)}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={type as AlertColor}
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

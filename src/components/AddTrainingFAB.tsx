import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import { useContext } from 'react';
import { ShowDraftTrainingCard } from '../lib/actions';
import { Permissions } from '../lib/permissions';
import { hasPermission } from '../lib/util';
import { stateContext } from '../provider/StateProvider';

export const AddTrainingFAB = () => {
    const { dispatch, state } = useContext(stateContext);
    const showDraftTrainingCard = () => {
        dispatch(ShowDraftTrainingCard());
    };
    const canCreateTraining = hasPermission(
        state.session.user,
        Permissions.ADD_TRAINING
    );
    return (
        (!state.draft && canCreateTraining && (
            <Fab
                onClick={showDraftTrainingCard}
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
            >
                <AddIcon />
            </Fab>
        )) ||
        null
    );
};

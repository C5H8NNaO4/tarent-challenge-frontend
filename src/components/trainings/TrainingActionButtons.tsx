import { Button } from '@mui/material';
import { useContext } from 'react';

import { Permissions } from '../../lib/permissions';
import { hasPermission } from '../../lib/util';
import { stateContext } from '../../provider/StateProvider';

interface TrainingActionButtonsProps {
    draft: boolean;
    onUpsert: () => void;
    onDelete: () => void;
}

export const TrainingActionButtons: React.FC<TrainingActionButtonsProps> = ({
    draft,
    onUpsert,
    onDelete,
}) => {
    const { state } = useContext(stateContext);
    const canDelete = hasPermission(state.session.user, Permissions.DEL_SLOT);

    return (
        <>
            <Button onClick={onUpsert} variant="contained">
                {draft ? 'Create' : 'Save'}
            </Button>
            {!draft && canDelete && (
                <Button onClick={onDelete} variant="contained" color="error">
                    Delete
                </Button>
            )}
        </>
    );
};

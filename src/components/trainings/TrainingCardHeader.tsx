import { useContext } from 'react';
import { titleCase } from 'title-case';
import { CardHeader } from '@mui/material';

import { EditModeButton } from '../EditModeButton';

import { hasPermission } from '../../lib/util';
import { stateContext } from '../../provider/StateProvider';
import { Permissions } from '../../lib/permissions';

interface TrainingCardHeaderProps {
    name: string;
    trainer: string;
    onActionClick: React.MouseEventHandler;
    editMode: boolean;
}
export const TrainingCardHeader: React.FC<TrainingCardHeaderProps> = ({
    name,
    trainer,
    onActionClick,
    editMode,
}) => {
    const { state } = useContext(stateContext);
    return (
        <CardHeader
            title={titleCase(name)}
            subheader={titleCase(trainer)}
            action={
                hasPermission(state.session?.user, Permissions.DEL_SLOT) && (
                    <EditModeButton onClick={onActionClick} active={editMode} />
                )
            }
        />
    );
};

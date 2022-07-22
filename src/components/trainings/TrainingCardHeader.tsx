import { useContext } from 'react';
import { titleCase } from 'title-case';
import { CardHeader, TextField } from '@mui/material';

import { EditModeButton } from '../EditModeButton';

import { hasPermission } from '../../lib/util';
import { stateContext } from '../../provider/StateProvider';
import { Permissions } from '../../lib/permissions';

interface TrainingCardHeaderProps {
    name: string;
    trainer: string;
    onActionClick: React.MouseEventHandler;
    onTitleChange: (text: string) => void;
    onTrainerChange: (text: string) => void;
    onDescriptionChange: (text: string) => void;
    editMode: boolean;
    draft: boolean;
}
export const TrainingCardHeader: React.FC<TrainingCardHeaderProps> = ({
    name,
    trainer,
    onActionClick,
    editMode,
    onTitleChange,
    onTrainerChange,
    draft,
}) => {
    const { state } = useContext(stateContext);
    return editMode ? (
        <CardHeader
            title={
                <TextField
                    label="Title"
                    onChange={(e) => onTitleChange(e.target.value)}
                    fullWidth
                    value={name}
                />
            }
            subheader={
                <TextField
                    label="Trainer"
                    onChange={(e) => onTrainerChange(e.target.value)}
                    value={trainer}
                    sx={{ mt: 1 }}
                />
            }
            action={
                hasPermission(state.session?.user, Permissions.DEL_SLOT) &&
                !draft && (
                    <EditModeButton onClick={onActionClick} active={editMode} />
                )
            }
        />
    ) : (
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

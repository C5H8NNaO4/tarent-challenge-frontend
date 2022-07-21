import { EditOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface EditModeButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    active: boolean;
}

export const EditModeButton: React.FC<EditModeButtonProps> = ({
    onClick,
    active,
}) => {
    return (
        <IconButton onClick={onClick} color={active ? 'primary' : 'default'}>
            <EditOutlined />
        </IconButton>
    );
};

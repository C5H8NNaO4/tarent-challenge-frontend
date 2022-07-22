import { Alert, TextField, Typography } from '@mui/material';

interface TrainingDescriptionProps {
    editMode: boolean;
    value: string;
    onChange: (description: string) => void;
}

export const TrainingDescription: React.FC<TrainingDescriptionProps> = ({
    editMode,
    value,
    onChange,
}) => {
    return editMode ? (
        <>
            <Alert severity="info">
                This description will be translated automatically. Please use
                english language for a consistent experience..
            </Alert>
            <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </>
    ) : (
        <Typography>{value}</Typography>
    );
};

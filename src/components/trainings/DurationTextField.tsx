import { TextField } from '@mui/material';

import { DurationIcon } from '../Icons';

interface DurationTextFieldProps {
    onChange: (cost: number) => void;
    value: number;
}

export const DurationTextField: React.FC<DurationTextFieldProps> = ({
    value,
    onChange,
}) => {
    return (
        <TextField
            label="Duration"
            InputProps={{
                startAdornment: <DurationIcon />,
            }}
            onChange={(e) => onChange(Number(e.target.value))}
            type="number"
            value={value}
        />
    );
};

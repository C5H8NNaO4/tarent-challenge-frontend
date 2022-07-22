import { TextField } from '@mui/material';

import { getLanguageCurrencySymbol } from '../../lib/util';
import { CostIcon, EuroIcon } from '../Icons';

interface CostTextFieldProps {
    onChange: (cost: number) => void;
    value: number;
}

const Icons = {
    $: <CostIcon />,
    '€': <EuroIcon />,
};

export const CostTextField: React.FC<CostTextFieldProps> = ({
    onChange,
    value,
}) => (
    <TextField
        InputProps={{
            startAdornment: Icons[getLanguageCurrencySymbol()],
        }}
        label="Cost"
        onChange={(e) => onChange(Number(e.target.value))}
        type="number"
        value={value}
    />
);

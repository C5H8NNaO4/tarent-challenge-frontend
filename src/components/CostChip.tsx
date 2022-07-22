import { Chip, Tooltip } from '@mui/material';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';

import { CostIcon } from './Icons';

import { useConvertCurrency } from '../lib/hooks';
import { getLanguageCurrencySymbol } from '../lib/util';

interface CostChipProps {
    value: number;
}

export const CostChip: React.FC<CostChipProps> = ({ value }) => {
    const convertedCost = useConvertCurrency(value);
    const { t } = useTranslation();

    const title = t('COST_CONVERSION', {
        cost: value,
        convertedCost,
        symbol: getLanguageCurrencySymbol(),
    });

    return (
        <Tooltip title={value === convertedCost ? '' : title}>
            <Chip
                icon={<CostIcon />}
                label={numeral(convertedCost).format('0$')}
            />
        </Tooltip>
    );
};

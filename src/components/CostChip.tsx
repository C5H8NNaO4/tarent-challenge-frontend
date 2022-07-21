import { Chip, Tooltip } from '@mui/material';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import { useConvertCurrency } from '../lib/hooks';
import { getLanguageCurrencySymbol } from '../lib/util';
import { CostIcon } from './Icons';

interface CostChipProps {
    cost: number;
}

export const CostChip: React.FC<CostChipProps> = ({ cost }) => {
    const convertedCost = useConvertCurrency(cost);
    const { t } = useTranslation();

    const title = t('COST_CONVERSION', {
        cost,
        convertedCost,
        symbol: getLanguageCurrencySymbol(),
    });

    return (
        <Tooltip title={cost === convertedCost ? '' : title}>
            <Chip
                icon={<CostIcon />}
                label={numeral(convertedCost).format('0$')}
            />
        </Tooltip>
    );
};

import { Chip, Grid } from '@mui/material';
import { useBookings } from '../../lib/data';
import { CostChip } from '../CostChip';
import { DurationIcon, UserIcon } from '../Icons';

interface InfoChips {
    trainingId: number;
    timeSlot: string | null;
    cost: number;
    duration: number;
    slots: number;
}

export const InfoChips: React.FC<InfoChips> = ({
    trainingId,
    timeSlot,
    cost,
    duration,
    slots,
}) => {
    const { data: bookings } = useBookings({ trainingId });
    const booked = bookings?.filter((booking) => booking.timeSlot === timeSlot);

    return (
        <Grid container spacing={1}>
            <Grid item>
                <CostChip cost={cost} />
            </Grid>
            <Grid item>
                <Chip icon={<DurationIcon />} label={`${duration} min`} />
            </Grid>
            {timeSlot && (
                <Grid item>
                    <Chip
                        icon={<UserIcon />}
                        label={`${booked?.length || 0} / ${slots}`}
                    />
                </Grid>
            )}
        </Grid>
    );
};

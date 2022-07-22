import { Chip, Grid, TextField } from '@mui/material';
import { useBookings } from '../../lib/data';
import { CostChip } from '../CostChip';
import { DurationIcon, UserIcon } from '../Icons';

interface InfoChips {
    trainingId: number;
    timeSlot: string | null;
    cost: number;
    duration: number;
    slots: number;
    editMode: boolean;
    onChangeCost: (cost: number) => void;
    onChangeDuration: (duration: number) => void;
}

export const InfoChips: React.FC<InfoChips> = ({
    trainingId,
    timeSlot,
    cost,
    duration,
    slots,
    editMode,
    onChangeCost,
    onChangeDuration,
}) => {
    const { data: bookings } = useBookings({ trainingId });
    const booked = bookings?.filter((booking) => booking.timeSlot === timeSlot);

    return (
        <Grid container spacing={1}>
            <Grid item>
                {editMode ? (
                    <TextField
                        onChange={(e) => onChangeCost(Number(e.target.value))}
                        type="number"
                        value={cost}
                    />
                ) : (
                    <CostChip cost={cost} />
                )}
            </Grid>
            <Grid item>
                {editMode ? (
                    <TextField
                        onChange={(e) =>
                            onChangeDuration(Number(e.target.value))
                        }
                        type="number"
                        value={duration}
                    />
                ) : (
                    <Chip icon={<DurationIcon />} label={`${duration} min`} />
                )}
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

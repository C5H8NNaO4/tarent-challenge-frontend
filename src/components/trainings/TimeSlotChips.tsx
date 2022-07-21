import { Grid } from '@mui/material';
import { RemovableTimeSlot } from '../RemovableTimeSlot';

interface TimeSlotChips {
    availableTimeSlots: string[];
    slots: number;
    trainingId: number;
    timeSlot: string | null;
    onClick(time: string): void;
    onAdd(time: string): void;
    onModify(oldSlot: string, newSlot: string): void;
    onDelete(time: string): void;
    editMode: boolean;
}

export const TimeSlotChips: React.FC<TimeSlotChips> = ({
    availableTimeSlots,
    slots,
    editMode,
    trainingId,
    timeSlot,
    onClick,
    onModify,
    onDelete,
    onAdd,
}) => {
    return (
        <Grid container spacing={1}>
            {(availableTimeSlots || []).sort().map((time: string) => (
                <Grid item>
                    <RemovableTimeSlot
                        key={time}
                        trainingId={trainingId}
                        onClick={onClick}
                        onModify={onModify}
                        onDelete={onDelete}
                        activeTimeSlot={timeSlot}
                        timeSlot={time}
                        slots={slots}
                        editMode={editMode}
                    />
                </Grid>
            ))}
            {editMode && (
                <Grid item>
                    <RemovableTimeSlot
                        trainingId={trainingId}
                        activeTimeSlot={timeSlot}
                        timeSlot={null}
                        // eslint-disable-next-line
                        onClick={() => {}}
                        onAdd={onAdd}
                        slots={slots}
                        editMode={editMode}
                    />
                </Grid>
            )}
        </Grid>
    );
};

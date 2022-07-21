import { useTranslation } from 'react-i18next';
import {
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Typography,
} from '@mui/material';
import { FunctionComponent, useState } from 'react';

import { TrainingCardHeader } from './TrainingCardHeader';
import { InfoChips } from './InfoChips';
import { TimeSlotChips } from './TimeSlotChips';

import { BookButton } from '../BookButton';
import {
    useAddTimeSlot,
    useModifyTimeSlot,
    useRemoveTimeSlot,
} from '../../lib/data';

export type TrainingCardProps = {
    id: number;
    trainer: string;
    name: string;
    cost: number;
    duration: number;
    slots: number;
    availableTimeSlots: string[];
};

export const TrainingCard: FunctionComponent<TrainingCardProps> = (props) => {
    const { id, trainer, name, cost, duration, slots, availableTimeSlots } =
        props;

    const { t } = useTranslation();

    const [timeSlot, setTimeSlot] = useState<string | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);

    const toggleEditMode = () => setEditMode(!editMode);
    const removeTimeSlot = useRemoveTimeSlot(id);
    const addTimeSlot = useAddTimeSlot(id);
    const modifyTimeSlot = useModifyTimeSlot(id);

    const render = () => (
        <Card sx={{ height: '100%' }}>
            <TrainingCardHeader
                editMode={editMode}
                name={name}
                onActionClick={toggleEditMode}
                trainer={trainer}
            />
            <CardContent>
                <Typography>{t(`DESC_TRAINING_${id}`)}</Typography>
                <InfoChips
                    trainingId={id}
                    slots={slots}
                    cost={cost}
                    duration={duration}
                    timeSlot={timeSlot}
                />
                <Box sx={{ mt: 1 }} />
                <TimeSlotChips
                    trainingId={id}
                    availableTimeSlots={availableTimeSlots}
                    slots={slots}
                    timeSlot={timeSlot}
                    onClick={setTimeSlot}
                    onAdd={addTimeSlot}
                    onModify={modifyTimeSlot}
                    onDelete={removeTimeSlot}
                    editMode={editMode}
                />
            </CardContent>
            <CardActionArea>
                <CardActions>
                    <BookButton
                        trainingId={id}
                        slots={slots}
                        timeSlot={timeSlot}
                    />
                </CardActions>
            </CardActionArea>
        </Card>
    );

    return render();
};

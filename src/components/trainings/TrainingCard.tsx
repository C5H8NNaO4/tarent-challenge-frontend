import {
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    LinearProgress,
} from '@mui/material';
import { FunctionComponent, useState } from 'react';

import { InfoChips } from './InfoChips';
import { TimeSlotChips } from './TimeSlotChips';
import { TrainingActionButtons } from './TrainingActionButtons';
import { TrainingCardHeader } from './TrainingCardHeader';
import { TrainingDescription } from './TrainingDescription';

import {
    useAddTimeSlot,
    useDeleteTraining,
    useModifyTimeSlot,
    useModifyTraining,
    useRemoveTimeSlot,
} from '../../lib/data';
import { useGoogleTranslate } from '../../lib/hooks';
import { BookButton } from '../BookButton';

export type TrainingCardProps = {
    id: number;
    trainer: string;
    name: string;
    cost: number;
    duration: number;
    slots: number;
    availableTimeSlots: string[];
    description: string;
    draft: boolean;
};

export const TrainingCard: FunctionComponent<TrainingCardProps> = (props) => {
    const {
        id,
        trainer,
        name,
        cost,
        duration,
        slots,
        availableTimeSlots,
        description,
        draft,
    } = props;

    const { text, loading } = useGoogleTranslate(description, { from: 'en' });

    const [timeSlot, setTimeSlot] = useState<string | null>(null);
    const [editMode, setEditMode] = useState<boolean>(draft);
    const [newTitle, setNewTitle] = useState<string>(name);
    const [newTrainer, setNewTrainer] = useState<string>(trainer);
    const [newCost, setNewCost] = useState<number>(cost);
    const [newDuration, setNewDuration] = useState<number>(duration);
    const [newDescription, setNewDescription] = useState<string>(description);

    const toggleEditMode = () => setEditMode(!editMode);
    const removeTimeSlot = useRemoveTimeSlot(id);
    const addTimeSlot = useAddTimeSlot(id);
    const modifyTimeSlot = useModifyTimeSlot(id);
    const modifyTraining = useModifyTraining(id);
    const deleteTraining = useDeleteTraining(id);

    const handleUpsert = async () => {
        await modifyTraining({
            name: newTitle,
            trainer: newTrainer,
            description: newDescription,
            cost: newCost,
            duration: newDuration,
            createNew: draft,
        });
        setEditMode(false);
    };

    const render = () => (
        <Card sx={{ height: '100%' }}>
            {loading && <LinearProgress variant="indeterminate" />}
            <TrainingCardHeader
                editMode={editMode}
                name={editMode ? newTitle : name}
                onActionClick={toggleEditMode}
                trainer={editMode ? newTrainer : trainer}
                onTitleChange={setNewTitle}
                onTrainerChange={setNewTrainer}
                onDescriptionChange={setNewDescription}
                draft={draft}
            />
            <CardContent>
                <TrainingDescription
                    editMode={editMode}
                    onChange={setNewDescription}
                    value={editMode ? newDescription : text}
                />
                <Box sx={{ mt: 1 }} />
                <InfoChips
                    trainingId={id}
                    slots={slots}
                    cost={editMode ? newCost : cost}
                    duration={editMode ? newDuration : duration}
                    timeSlot={timeSlot}
                    editMode={editMode}
                    onChangeCost={setNewCost}
                    onChangeDuration={setNewDuration}
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
                    {!editMode ? (
                        <BookButton
                            trainingId={id}
                            slots={slots}
                            timeSlot={timeSlot}
                        />
                    ) : (
                        <TrainingActionButtons
                            draft={draft}
                            onUpsert={handleUpsert}
                            onDelete={deleteTraining}
                        />
                    )}
                </CardActions>
            </CardActionArea>
        </Card>
    );

    return render();
};

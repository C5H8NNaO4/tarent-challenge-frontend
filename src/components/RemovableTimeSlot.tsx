import { CheckCircleOutline } from '@mui/icons-material';
import { Chip, Menu, TextField } from '@mui/material';
import {
    LocalizationProvider,
    StaticDateTimePicker,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, parse } from 'date-fns';
import { useContext, useState } from 'react';

import { useBookings } from '../lib/data';
import { hasBooked } from '../lib/util';
import { stateContext } from '../provider/StateProvider';

interface RemovableTimeSlotProps {
    trainingId: number;
    activeTimeSlot: string | null;
    timeSlot: string | null;
    slots: number;
    onClick: (time: string) => void;
    onDelete?: (time: string) => void;
    onModify?: (oldTime: string, newTime: string) => void;
    onAdd?: (time: string) => void;
    editMode: boolean;
}

export const RemovableTimeSlot: React.FC<RemovableTimeSlotProps> = ({
    activeTimeSlot,
    timeSlot,
    slots,
    onClick,
    onDelete,
    onAdd,
    onModify,
    trainingId,
    editMode,
}) => {
    const { state } = useContext(stateContext);
    const { data: bookings } = useBookings({ trainingId });

    const [value, setValue] = useState<Date | null>(
        timeSlot ? parse(timeSlot, 'HH:mm', new Date()) : null
    );
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClose = () => setAnchorEl(null);

    const bookedSlots =
        bookings?.filter((booking) => booking.timeSlot === timeSlot) || [];

    const isBooked =
        timeSlot && hasBooked(timeSlot, state.session.user, bookings || []);

    const handleClick = editMode
        ? (e: React.MouseEvent<HTMLElement>) =>
              setAnchorEl(e.target as HTMLElement)
        : () => timeSlot && onClick(timeSlot);

    const handleAccept = timeSlot
        ? (newTimeSlot: string) => onModify?.(timeSlot, newTimeSlot)
        : onAdd;

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Chip
                color={
                    // eslint-disable-next-line no-nested-ternary
                    activeTimeSlot === timeSlot
                        ? 'primary'
                        : isBooked || timeSlot === null
                        ? 'success'
                        : 'default'
                }
                disabled={bookedSlots?.length === slots && !isBooked}
                icon={isBooked ? <CheckCircleOutline /> : undefined}
                label={timeSlot ?? '+'}
                onClick={handleClick}
                onDelete={
                    (bookedSlots.length === 0 &&
                        timeSlot &&
                        editMode &&
                        (() => onDelete?.(timeSlot))) ||
                    undefined
                }
            />
            <Menu
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorEl={anchorEl}
            >
                <StaticDateTimePicker
                    displayStaticWrapperAs="mobile"
                    openTo="day"
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    onAccept={
                        (value &&
                            (() =>
                                handleAccept?.(
                                    format(value, 'dd.MM HH:mm')
                                ))) ||
                        undefined
                    }
                    renderInput={(params) => <TextField {...params} />}
                />
            </Menu>
        </LocalizationProvider>
    );
};

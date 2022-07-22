import { Button } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ShowSuccessMessage } from '../lib/actions';
import { useBookings } from '../lib/data';
import { Permissions } from '../lib/permissions';
import {
    generateApiPath,
    handleAxiosError,
    hasBooked,
    hasPermission,
} from '../lib/util';
import { stateContext } from '../provider/StateProvider';
import { FailureMessage } from '../types';

interface BookButtonProps {
    trainingId: number;
    slots: number;
    timeSlot: string | null;
}
export const BookButton: React.FC<BookButtonProps> = ({
    trainingId,
    slots,
    timeSlot,
}) => {
    const { state, dispatch } = useContext(stateContext);
    const { t } = useTranslation();
    const { data: bookings, refetch } = useBookings({ trainingId });

    const bookedSlots = bookings?.filter(
        (booking) => booking.timeSlot === timeSlot
    );

    const isBooked =
        timeSlot && hasBooked(timeSlot, state.session.user, bookings || []);

    const canBook =
        (timeSlot !== null &&
            state.session.user &&
            hasPermission(state.session.user, Permissions.BOOK_TRAINING) &&
            (bookedSlots?.length || 0) < slots) ||
        isBooked;

    const book = async () => {
        try {
            await (!isBooked
                ? axios.post<{ trainingId: number }>(
                      generateApiPath(`/training/${trainingId}/booking`),
                      { timeSlot },
                      { withCredentials: true }
                  )
                : axios.delete<{ trainingId: number }>(
                      generateApiPath(
                          `/training/${trainingId}/booking/${timeSlot}`
                      ),
                      { withCredentials: true }
                  ));
            dispatch(
                ShowSuccessMessage(
                    t(!isBooked ? 'BOOKED_SUCCESS' : 'CANCEL_SUCCESS')
                )
            );
            await refetch();
        } catch (e) {
            handleAxiosError(
                dispatch,
                e as unknown as AxiosError<FailureMessage>
            );
        }
    };

    return (
        <Button variant="contained" disabled={!canBook} onClick={book}>
            {t(!isBooked ? 'BOOK' : 'CANCEL')}
        </Button>
    );
};

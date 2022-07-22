import axios, { AxiosError } from 'axios';
import { atom, useAtom } from 'jotai';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { HideDraftTrainingCard, ShowSuccessMessage } from './actions';
import { generateApiPath, handleAxiosError } from './util';

import { TrainingCardProps } from '../components/trainings/TrainingCard';
import { stateContext } from '../provider/StateProvider';
import { Booking, FailureMessage } from '../types';

const trainingsAtom = atom<TrainingCardProps[] | null>(null);

export const useTrainings = () => {
    const [trainings, setTrainigs] = useAtom(trainingsAtom);
    const [error, setError] = useState<Error | null>(null);

    const refetch = async () => {
        try {
            const data = await axios.get<TrainingCardProps[]>(
                generateApiPath('/trainings')
            );
            setTrainigs(data.data);
        } catch (e) {
            setError(e as Error);
        }
    };

    useEffect(() => {
        if (trainings === null) {
            refetch();
        }
    }, []);

    return {
        loading: trainings === null && error === null,
        data: trainings,
        error,
        refetch,
    };
};

const bookingAtom = atom<Booking[] | null>(null);
const atoms: Record<string, typeof bookingAtom> = {};

export const useBookings = (props: { trainingId: number }) => {
    const { trainingId } = props;

    const bookingsAtom = useMemo(
        // eslint-disable-next-line  no-return-assign
        () =>
            atoms[trainingId] ||
            (atoms[trainingId] = atom<Booking[] | null>(null)),
        []
    );

    const [bookings, setBookings] = useAtom(bookingsAtom);
    const [error, setError] = useState<Error | null>(null);

    const refetch = async () => {
        try {
            const data = await axios.get<Booking[]>(
                generateApiPath(`/training/${trainingId}/bookings`)
            );
            setBookings(data.data);
        } catch (e) {
            setError(e as Error);
        }
    };

    useEffect(() => {
        if (!bookings) {
            refetch();
        }
    }, []);

    return {
        loading: bookings === null && error === null,
        data: bookings || null,
        error,
        refetch,
    };
};

export const useRemoveTimeSlot = (trainingId: number) => {
    const { dispatch } = useContext(stateContext);
    const { t } = useTranslation();
    const { refetch } = useTrainings();

    return useCallback(
        async (timeSlot: string | null) => {
            if (!timeSlot) return;
            try {
                await axios.delete(
                    generateApiPath(`/training/${trainingId}/slot/${timeSlot}`),
                    {
                        withCredentials: true,
                    }
                );
                await refetch();
                dispatch(ShowSuccessMessage(t('SLOT_REMOVE_SUCCESS')));
            } catch (e) {
                handleAxiosError(
                    dispatch,
                    e as unknown as AxiosError<FailureMessage>
                );
            }
        },
        [trainingId]
    );
};

export const useAddTimeSlot = (trainingId: number) => {
    const { dispatch } = useContext(stateContext);
    const { t } = useTranslation();
    const { refetch } = useTrainings();

    return useCallback(
        async (timeSlot: string | null) => {
            if (timeSlot === null) {
                return;
            }

            try {
                await axios.post(
                    generateApiPath(`/training/${trainingId}/slot`),
                    {
                        timeSlot,
                    },
                    {
                        withCredentials: true,
                    }
                );
                await refetch();
                dispatch(ShowSuccessMessage(t('SLOT_ADD_SUCCESS')));
            } catch (e) {
                handleAxiosError(
                    dispatch,
                    e as unknown as AxiosError<FailureMessage>
                );
            }
        },
        [trainingId]
    );
};

export const useModifyTimeSlot = (trainingId: number) => {
    const { dispatch } = useContext(stateContext);
    const { t } = useTranslation();
    const { refetch } = useTrainings();

    return useCallback(
        async (oldTimeSlot: string, newTimeSlot: string | null) => {
            if (newTimeSlot === null) {
                return;
            }

            try {
                await axios.put(
                    generateApiPath(
                        `/training/${trainingId}/slot/${oldTimeSlot}`
                    ),
                    {
                        timeSlot: newTimeSlot,
                    },
                    {
                        withCredentials: true,
                    }
                );
                await refetch();
                dispatch(ShowSuccessMessage(t('SLOT_MODIFY_SUCCESS')));
            } catch (e) {
                handleAxiosError(
                    dispatch,
                    e as unknown as AxiosError<FailureMessage>
                );
            }
        },
        [trainingId]
    );
};

export const useDeleteTraining = (trainingId: number) => {
    const { dispatch } = useContext(stateContext);
    const { t } = useTranslation();
    const { refetch } = useTrainings();

    return useCallback(async () => {
        try {
            await axios.delete(generateApiPath(`/training/${trainingId}`), {
                withCredentials: true,
            });
            await refetch();
            dispatch(ShowSuccessMessage(t('DELETE_TRAINING_SUCCESS')));
        } catch (e) {
            handleAxiosError(
                dispatch,
                e as unknown as AxiosError<FailureMessage>
            );
        }
    }, [trainingId]);
};

export const useModifyTraining = (trainingId: number) => {
    const { dispatch, state } = useContext(stateContext);
    const { t } = useTranslation();
    const { refetch } = useTrainings();

    return useCallback(
        async ({
            name,
            trainer,
            description,
            cost,
            duration,
            createNew,
        }: {
            name: string;
            trainer: string;
            description: string;
            cost: number;
            duration: number;
            createNew: boolean;
        }) => {
            try {
                await axios[createNew ? 'post' : 'put'](
                    generateApiPath(
                        createNew ? '/training' : `/training/${trainingId}`
                    ),
                    {
                        name,
                        trainer,
                        description,
                        cost,
                        duration,
                        createNew,
                    },
                    {
                        withCredentials: true,
                    }
                );
                await refetch();
                dispatch(ShowSuccessMessage(t('TRAINING_MODIFY_SUCCESS')));
                if (createNew && state.draft) {
                    dispatch(HideDraftTrainingCard());
                }
            } catch (e) {
                handleAxiosError(
                    dispatch,
                    e as unknown as AxiosError<FailureMessage>
                );
                dispatch(HideDraftTrainingCard());
            }
        },
        [trainingId]
    );
};

export const useAddTraining = () => {
    const { dispatch } = useContext(stateContext);
    const { t } = useTranslation();
    const { refetch } = useTrainings();

    return useCallback(
        async ({
            name,
            trainer,
            description,
        }: {
            name: string;
            trainer: string;
            description: string;
        }) => {
            try {
                await axios.post(
                    generateApiPath(`/training`),
                    {
                        name,
                        trainer,
                        description,
                    },
                    {
                        withCredentials: true,
                    }
                );
                await refetch();
                dispatch(ShowSuccessMessage(t('ADD_TRAINING_SUCCESS')));
            } catch (e) {
                handleAxiosError(
                    dispatch,
                    e as unknown as AxiosError<FailureMessage>
                );
            }
        },
        []
    );
};

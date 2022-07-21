import { ArrowDownward } from '@mui/icons-material';
import axios, { AxiosError } from 'axios';
import { useCallback, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { stateContext } from '../provider/StateProvider';
import { User } from '../types';
import { Login, ShowErrorMessage, ShowSuccessMessage } from './actions';
import { generateApiPath, handleAxiosError } from './util';

export const useRestoreSession = (
    username: string,
    password: string | null
) => {
    const { dispatch, state } = useContext(stateContext);
    const { t } = useTranslation();

    useEffect(() => {
        if (state.session.user !== null) return;

        (async () => {
            const sessionUserResponse = await axios.get<User>(
                generateApiPath('/login'),
                {
                    withCredentials: true,
                }
            );

            dispatch(Login(sessionUserResponse.data));

            if (typeof sessionUserResponse.data.id === 'undefined') {
                const loginResponse = await axios.post<User>(
                    generateApiPath('/login'),
                    {
                        username,
                        password,
                    },
                    {
                        withCredentials: true,
                    }
                );
                dispatch(Login(loginResponse.data));
                dispatch(
                    ShowSuccessMessage(
                        t('WELCOME', { user: loginResponse.data.name })
                    )
                );
            } else {
                dispatch(
                    ShowSuccessMessage(
                        t('WELCOME', { user: sessionUserResponse.data.name })
                    )
                );
            }
        })();
    }, []);

    return state.session;
};

export const useLogin = (username: string, password: string) => {
    const { dispatch } = useContext(stateContext);
    const { t } = useTranslation();

    return useCallback(async () => {
        try {
            const loginResponse = await axios.post<User>(
                generateApiPath('/login'),
                {
                    username,
                    password,
                },
                {
                    withCredentials: true,
                }
            );
            dispatch(Login(loginResponse.data));
            dispatch(
                ShowSuccessMessage(
                    t('WELCOME', { user: loginResponse.data.name })
                )
            );
        } catch (e) {
            // Login failures are handled by passport directly, so the response is text instead of json
            const castedError = e as unknown as AxiosError<string>;
            if (castedError?.response?.data) {
                dispatch(ShowErrorMessage(castedError.response.data));
            } else {
                dispatch(ShowErrorMessage(castedError.message));
            }
        }
    }, [username, password]);
};

export const useLogout = () => {
    const { state, dispatch } = useContext(stateContext);

    return useCallback(async () => {
        await axios.post(
            generateApiPath('/logout'),
            {},
            {
                withCredentials: true,
            }
        );
        dispatch(ShowSuccessMessage(`Goodbye ${state?.session?.user?.name}`));
        dispatch(Login(null));
    }, []);
};

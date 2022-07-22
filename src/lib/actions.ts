import { v4 as uuid } from 'uuid';

import { Actions, Toast, User } from '../types';

/** Action generator. Generates a search action */
export const Search = (search: string) => {
    return {
        type: Actions.SET_SEARCH,
        value: search,
    };
};

/** Action generator. Generates a login action */
export const Login = (user: User | null) => {
    return {
        type: Actions.LOGIN,
        value: user,
    };
};

export const ShowSuccessMessage = (message: string) => {
    return ShowToast({
        id: uuid(),
        type: 'success',
        message,
    });
};

export const ShowErrorMessage = (message: string) => {
    return ShowToast({
        id: uuid(),
        type: 'error',
        message,
    });
};

export const ShowToast = (toast: Toast | null) => {
    return {
        type: Actions.SHOW_TOAST,
        value: toast,
    };
};

export const HideToast = (toast: Toast | null) => {
    return {
        type: Actions.HIDE_TOAST,
        value: toast,
    };
};

export const ShowDraftTrainingCard = () => {
    return {
        type: Actions.SHOW_DRAFT,
        value: null,
    };
};

export const HideDraftTrainingCard = () => {
    return {
        type: Actions.HIDE_DRAFT,
        value: null,
    };
};

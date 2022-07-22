import React from 'react';

import { Actions, IReducerAction, IReducerState, Toast, User } from '../types';

/** Compose reducers. */
export const compose: (
    ...fns: React.Reducer<IReducerState, IReducerAction<any>>[]
) => React.Reducer<IReducerState, IReducerAction<any>> =
    (...fns) =>
    (state, action) =>
        fns.reduce((acc, cur) => cur(acc, action), state);

/**
 * Search reducer that updates the search state of the app.
 */
export const searchReducer: React.Reducer<
    IReducerState,
    IReducerAction<string>
> = (state, action) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { search, ...rest } = state;
    const { type, value } = action;

    switch (type) {
        case Actions.SET_SEARCH: {
            return { search: value, ...rest };
        }
        default:
            return state;
    }
};

/**
 * Session reducer that maintains the session / user state of the app.
 */
export const sessionReducer: React.Reducer<
    IReducerState,
    IReducerAction<User | null>
> = (state, action) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { session, ...rest } = state;
    const { type, value } = action;

    switch (type) {
        case Actions.LOGIN: {
            const newUser = value;
            return { session: { user: newUser }, ...rest };
        }
        default:
            return state;
    }
};

/**
 * Toast reducer that maintains a queue of messages to be displayed on the UI
 */
export const toastReducer: React.Reducer<
    IReducerState,
    IReducerAction<Toast>
> = (state, action) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { toasts, ...rest } = state;
    const { type, value } = action;

    switch (type) {
        case Actions.SHOW_TOAST: {
            const newToasts = [...toasts, value];

            return { toasts: newToasts, ...rest };
        }
        case Actions.HIDE_TOAST: {
            const newToasts = toasts.filter((toast) => toast.id !== value.id);
            return { toasts: newToasts, ...rest };
        }
        default:
            return state;
    }
};

export const uiReducer: React.Reducer<
    IReducerState,
    IReducerAction<undefined>
> = (state, action) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { draft, ...rest } = state;
    const { type } = action;

    switch (type) {
        case Actions.SHOW_DRAFT: {
            return { draft: true, ...rest };
        }
        case Actions.HIDE_DRAFT: {
            return { draft: false, ...rest };
        }
        default:
            return state;
    }
};

export default compose(searchReducer, sessionReducer, toastReducer, uiReducer);

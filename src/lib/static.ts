import { Atom, atom } from 'jotai';
import { IReducerState } from '../types';

/** Initial state for the composed reducer */
export const initialState: IReducerState = {
    session: {
        user: null,
    },
    search: '',
    toasts: [],
};

/** Contains all atoms used to store settings. */
export const atoms: { [index: string]: Atom<boolean> } = {
    darkmode: atom(false),
    'darkmode-os': atom(false),
    fuzzy: atom(true),
    background: atom(true),
};

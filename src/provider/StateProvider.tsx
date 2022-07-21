import {
    FunctionComponent,
    useReducer,
    createContext,
    useMemo,
    PropsWithChildren,
} from 'react';
import mainReducer from '../lib/reducer';
import { initialState } from '../lib/static';

export const useAppState = () => useReducer(mainReducer, initialState);

export const stateContext = createContext({
    state: initialState,
    dispatch: Function.prototype,
});

/**
 * Provides child components with the applications data.
 * @returns
 */
export const StateProvider: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const [state, dispatch] = useAppState();
    const value = useMemo(() => ({ state, dispatch }), [state]);

    return (
        <stateContext.Provider value={value}>{children}</stateContext.Provider>
    );
};

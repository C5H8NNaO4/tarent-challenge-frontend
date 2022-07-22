/* eslint-disable react/jsx-one-expression-per-line */
import { Theme } from '@mui/material';
import {
    ThemeProvider as MUIThemeProvider,
    createTheme,
} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, {
    PropsWithChildren,
    FunctionComponent,
    useEffect,
    useMemo,
    useState,
} from 'react';

import darkTheme from '../lib/darkTheme';
import lightTheme from '../lib/lightTheme';
import defaultTheme from '../lib/theme';

const themeContext = React.createContext({});

export type UseThemeProps = {
    darkModeDefault?: boolean;
    osDefault?: boolean;
};
export type UseThemeResult = {
    theme: Theme;
    darkMode: boolean;
    toggleDarkMode: () => void;
    prefersDarkMode: boolean;
    setOsValue: () => void;
    os: boolean;
};

export const useTheme = ({
    darkModeDefault = false,
    osDefault = true,
}: UseThemeProps = {}): UseThemeResult => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const [os, setOs] = useState(
        typeof localStorage.useOs === 'undefined'
            ? osDefault
            : localStorage.useOs === 'true'
    );
    const [darkMode, setDarkMode] = useState(
        (os && prefersDarkMode) || typeof localStorage.darkMode === 'undefined'
            ? darkModeDefault
            : localStorage.darkMode === 'true' || defaultTheme.mode === 'dark'
    );
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.darkMode = !darkMode;
    };

    const setOsValue = () => {
        localStorage.useOs = !os;
        setOs(!os);
        setDarkMode(!os ? prefersDarkMode : localStorage.darkMode === 'true');
    };

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (!os && !darkModeDefault && !!(localStorage.useOs === 'true')) {
            return setOsValue();
        }
        if (prefersDarkMode && os && !darkMode) {
            return setDarkMode(true);
        }
    }, [prefersDarkMode, os]);

    const modeTheme = darkMode ? darkTheme : lightTheme;

    const theme = createTheme({
        ...defaultTheme,
        ...modeTheme,
        palette: {
            ...defaultTheme.palette,
            ...modeTheme.palette,
            mode: darkMode ? 'dark' : 'light',
        },
    });

    return { theme, darkMode, toggleDarkMode, prefersDarkMode, setOsValue, os };
};

type ThemeProviderProps = {
    darkModeDefault: boolean;
    osDefault: boolean;
};

const ThemeProvider: FunctionComponent<
    PropsWithChildren<ThemeProviderProps>
> = (props) => {
    const { children, darkModeDefault = false, osDefault = false } = props;
    const { theme, darkMode, toggleDarkMode, prefersDarkMode, setOsValue, os } =
        useTheme({ darkModeDefault, osDefault });

    const value = useMemo(
        () => ({
            theme,
            darkMode,
            toggleDarkMode,
            prefersDarkMode,
            setOsValue,
            os,
        }),
        [theme, darkMode, prefersDarkMode, os]
    );

    return (
        <themeContext.Provider value={value}>
            <MUIThemeProvider theme={theme}> {children} </MUIThemeProvider>
        </themeContext.Provider>
    );
};

export { ThemeProvider, themeContext };

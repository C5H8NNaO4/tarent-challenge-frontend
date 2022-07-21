import { FunctionComponent, PropsWithChildren, useContext } from 'react';
import clsx from 'clsx';

import { DefaultLayout } from './Layout';

import { StateProvider } from '../provider/StateProvider';
import { ErrorBoundary } from '../components/ErrorBoundary';
import {
    themeContext,
    ThemeProvider,
    UseThemeResult,
} from '../provider/ThemeProvider';
import { VantaBackground } from '../components/Background';
import { useSetting } from '../components/Settings';

/**
 * Main entry point. Renders providers and the layout.
 * @returns
 */
export const Main: FunctionComponent = (props) => {
    const [animated] = useSetting('background', true);

    return (
        <ErrorBoundary>
            <StateProvider>
                <ThemeProvider darkModeDefault={false} osDefault>
                    <VantaBackground enabled={animated as boolean}>
                        <ClassNames>
                            <DefaultLayout {...props} />
                        </ClassNames>
                    </VantaBackground>
                </ThemeProvider>
            </StateProvider>
        </ErrorBoundary>
    );
};

const ClassNames: React.FC<PropsWithChildren> = ({ children }) => {
    const [animated] = useSetting('background', true);
    const { darkMode } = useContext(themeContext) as UseThemeResult;

    return (
        <div
            className={clsx({
                animated,
                dark: darkMode,
                light: !darkMode,
            })}
        >
            {children}
        </div>
    );
};

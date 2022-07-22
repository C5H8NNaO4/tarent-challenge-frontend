import clsx from 'clsx';
import { FunctionComponent, PropsWithChildren, useContext } from 'react';

import { DefaultLayout } from './Layout';

import { VantaBackground } from '../components/Background';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useSetting } from '../components/Settings';
import { StateProvider } from '../provider/StateProvider';
import {
    themeContext,
    ThemeProvider,
    UseThemeResult,
} from '../provider/ThemeProvider';

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

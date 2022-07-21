import { Route, Routes as RouterRoutes } from 'react-router';
import { DemoPage } from '../pages/DemoPage';

/** Contains all the roots of the app. It's only one but in a more complex app you would probably have a router. */
export const Routes = () => {
    return (
        <RouterRoutes>
            <Route path="/" element={<DemoPage />} />
        </RouterRoutes>
    );
};

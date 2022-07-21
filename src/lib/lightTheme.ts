import { PRIMARY_LIGHT, SECONDARY_LIGHT } from './colors';
import defaultTheme from './theme';

/** The light theme for material ui */
const theme = {
    palette: {
        ...defaultTheme.palette,
        type: 'light',
        primary: {
            main: PRIMARY_LIGHT,
        },
        secondary: {
            main: SECONDARY_LIGHT,
        },
        hover: {
            main: PRIMARY_LIGHT,
        },
        active: {
            main: SECONDARY_LIGHT,
        },
        background: {
            default: '#fff !important',
        },
    },
};

export default theme;

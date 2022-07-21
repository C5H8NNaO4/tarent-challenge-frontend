import { SECONDARY_DARK_LIGHT, PRIMARY_DARK, SECONDARY_DARK } from './colors';

/** The dark theme for material ui */
const theme = {
    overrides: {
        MuiTableRow: {
            root: {
                backgroundColor: SECONDARY_DARK_LIGHT,
            },
        },
        DayScaleEmptyCell: {
            emptyCell: {
                backgroundColor: SECONDARY_DARK_LIGHT,
            },
        },
    },
    palette: {
        type: 'dark',
        primary: {
            main: PRIMARY_DARK,
        },
        secondary: {
            main: SECONDARY_DARK,
        },
        hover: {
            main: SECONDARY_DARK,
        },
        active: {
            main: PRIMARY_DARK,
        },
        background: {
            default: '#1E1F27 !important',
            paper: '#1E1F27',
        },
    },
};

export default theme;

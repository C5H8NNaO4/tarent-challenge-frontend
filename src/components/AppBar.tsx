// eslint-disable-next-line no-use-before-define
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, {
    ChangeEventHandler,
    FunctionComponent,
    useContext,
} from 'react';

import { CloseIcon } from './Icons';
import { TranslatedTextField } from './Translated';

import { Search as SetSearch } from '../lib/actions';
import { stateContext } from '../provider/StateProvider';
import { SearchAppBarProps } from '../types';

/** Styling from the material ui docs */
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

/** Renders an input field with a search adornment and a clear button */
export const SearchField: FunctionComponent<{
    onChange?: ChangeEventHandler<HTMLInputElement>;
}> = ({ onChange }) => {
    const {
        state: { search },
        dispatch,
    } = useContext(stateContext);
    const onClear = () => dispatch(SetSearch(''));

    return (
        <Search>
            <TranslatedTextField
                fullWidth
                placeholder="PLACEHOLDER_SEARCH"
                onChange={onChange}
                value={search}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={onClear}>
                                <CloseIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Search>
    );
};

/** Renders an Appbar with a Searchfield */
export const SearchAppBar: React.FunctionComponent<SearchAppBarProps> = ({
    title,
    onChange,
    children,
    ...rest
}) => (
    <Box sx={{ flexGrow: 0 }}>
        <AppBar position="static" {...rest} color="default">
            <Toolbar>
                <img
                    height={24}
                    alt="logo"
                    src="https://www.tarent.de/wp-content/uploads/dark.svg"
                />
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    {title}
                </Typography>
                <SearchField onChange={onChange} />
                {children}
            </Toolbar>
        </AppBar>
    </Box>
);

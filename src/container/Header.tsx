import React, { FunctionComponent, useContext, useState } from 'react';
import { IconButton, LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import { SearchAppBar } from '../components/AppBar';
import { FilterListIcon } from '../components/Icons';
import { SelectLanguageButton } from '../components/SelectLanguageMenu';
import { TranslatedAlert } from '../components/Translated';
import { Search } from '../lib/actions';
import { SettingsMenuButton } from '../pages/SettingsPage';
import { stateContext } from '../provider/StateProvider';
import { SessionButton } from '../components/LoginButton';
import { HelpButton } from '../components/HelpButton';

/**
 * Header of the App. Renders the AppBar, filter menu and loading indicators
 * @returns
 */
export const Header: FunctionComponent = () => {
    const { dispatch } = useContext(stateContext);
    const { loading } = { loading: false };

    const [anchorEl, setAnchorEl] = useState(null as any);

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
        dispatch(Search(e.target.value));

    return (
        <>
            <SearchAppBar onChange={onChange} color="primary">
                <Box sx={{ flexGrow: 1 }} />
                <SelectLanguageButton />
                <SettingsMenuButton />
                <SessionButton />
                <HelpButton />
            </SearchAppBar>

            {loading && (
                <>
                    <LinearProgress />
                    <TranslatedAlert severity="info">
                        DESC_DATA_LOADING
                    </TranslatedAlert>
                </>
            )}
        </>
    );
};

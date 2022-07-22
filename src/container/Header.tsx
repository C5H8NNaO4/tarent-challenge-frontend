import { Box } from '@mui/system';
import React, { FunctionComponent, useContext } from 'react';

import { SearchAppBar } from '../components/AppBar';
import { HelpButton } from '../components/HelpButton';
import { SessionButton } from '../components/LoginButton';
import { SelectLanguageButton } from '../components/SelectLanguageMenu';
import { Search } from '../lib/actions';
import { SettingsMenuButton } from '../pages/SettingsPage';
import { stateContext } from '../provider/StateProvider';

/**
 * Header of the App. Renders the AppBar, filter menu and loading indicators
 * @returns
 */
export const Header: FunctionComponent = () => {
    const { dispatch } = useContext(stateContext);

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
        dispatch(Search(e.target.value));

    return (
        <SearchAppBar onChange={onChange} color="primary">
            <Box sx={{ flexGrow: 1 }} />
            <SelectLanguageButton />
            <SettingsMenuButton />
            <SessionButton />
            <HelpButton />
        </SearchAppBar>
    );
};

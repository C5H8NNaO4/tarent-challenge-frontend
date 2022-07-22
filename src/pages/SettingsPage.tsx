import {
    Card,
    CardHeader,
    IconButton,
    List,
    Menu,
    MenuItem,
} from '@mui/material';
import React, { FunctionComponent, useState } from 'react';

import { SettingsIcon } from '../components/Icons';
import {
    BackgroundSetting,
    DarkModeOsSetting,
    DarkModeSetting,
    SettingListItem,
} from '../components/Settings';

export const Settings = () => {
    return (
        <>
            <DarkModeSetting />
            <DarkModeOsSetting />
            <SettingListItem
                label="LABEL_FUZZY_SEARCH"
                name="fuzzy"
                type="boolean"
            />
        </>
    );
};
export const SettingsCard = () => {
    return (
        <Card square>
            <CardHeader title="Settings" />
            <List>
                <Settings />
            </List>
        </Card>
    );
};

type Menu = {
    anchorEl?: HTMLAnchorElement;
    onClose: React.MouseEventHandler<HTMLElement>;
};

export const SettingsMenuButton = () => {
    const [anchorEl, setAnchorEl] = useState(null as any);

    const handleClose = () => setAnchorEl(null);
    const handleOpen: React.MouseEventHandler<HTMLButtonElement> = (e) =>
        setAnchorEl(e.target);
    return (
        <>
            <IconButton onClick={handleOpen}>
                <SettingsIcon />
            </IconButton>
            <SettingsMenu anchorEl={anchorEl} onClose={handleClose} />
        </>
    );
};
export const SettingsMenu: FunctionComponent<Menu> = ({
    anchorEl,
    onClose,
}) => {
    return (
        <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}>
            <MenuItem>
                <DarkModeSetting />
            </MenuItem>
            <MenuItem>
                <DarkModeOsSetting />
            </MenuItem>
            <MenuItem>
                <BackgroundSetting />
            </MenuItem>
            <MenuItem>
                <SettingListItem
                    label="LABEL_FUZZY_SEARCH"
                    name="fuzzy"
                    type="boolean"
                />
            </MenuItem>
        </Menu>
    );
};
export const SettingsPage = SettingsCard;

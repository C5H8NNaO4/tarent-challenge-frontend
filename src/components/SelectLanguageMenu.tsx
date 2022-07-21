/* eslint-disable react/jsx-one-expression-per-line */
import {
    ButtonProps,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageIcon } from './Icons';

import * as resources from '../locale';

type SelectLanguageMenuProps = {
    anchorEl: HTMLAnchorElement;
    handleClose: (v: string | null) => void;
};

export const SelectLanguageMenu: FunctionComponent<SelectLanguageMenuProps> = ({
    anchorEl,
    handleClose,
}) => {
    const languages = Object.keys(resources);
    const open = Boolean(anchorEl);
    const { t } = useTranslation();

    return (
        <Menu
            id="select-language-menu"
            keepMounted
            open={open}
            anchorEl={anchorEl}
            onClose={() => handleClose(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            {languages.map((lang) => {
                return (
                    <MenuItem
                        key={`language-menuitem-${lang}`}
                        onClick={() => handleClose(lang)}
                    >
                        <Typography>{t(lang)}</Typography>
                    </MenuItem>
                );
            })}
        </Menu>
    );
};

export const SelectLanguageButton: FunctionComponent<ButtonProps> = (props) => {
    const [anchorEl, setAnchorEl] = useState(null as any);
    const { i18n } = useTranslation();

    const handleClose = (v: string | null) => {
        if (typeof v === 'string') {
            i18n.changeLanguage(v);
        }
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                {...props}
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                <LanguageIcon />
            </IconButton>
            <SelectLanguageMenu handleClose={handleClose} anchorEl={anchorEl} />
        </>
    );
};

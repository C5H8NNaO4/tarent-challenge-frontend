/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/ban-types */
import React, { FunctionComponent, useContext } from 'react';
import {
    ListItemIcon,
    SvgIconTypeMap,
    Switch,
    SwitchProps,
    Tooltip,
} from '@mui/material';
import { WavesRounded } from '@mui/icons-material';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { BrightIcon, DarkIcon, OSIcon, SettingsIcon, UserIcon } from './Icons';
import { TranslatedListItemText } from './Translated';

import { useLocalStorage } from '../lib/hooks';
import { themeContext, UseThemeResult } from '../provider/ThemeProvider';
import { atoms } from '../lib/static';

export const useSetting = (
    key: string,
    value: unknown
): [unknown, (v: unknown) => void] => {
    if (!atoms[key]) throw new Error(`No atom found for key ${key}`);

    const state = useLocalStorage(key, atoms[key], value);
    return state;
};

type BooleanSettingProps = {
    value: boolean;
    disabled?: boolean;
    color?: SwitchProps['color'];
    onChange: React.ChangeEventHandler<HTMLInputElement>;
};

/** Renders a Switch component that can be used to toggle a boolean setting */
export const BooleanSetting: FunctionComponent<BooleanSettingProps> = (
    props
) => {
    const { value, onChange, disabled, color } = props;

    return (
        <Switch
            color={color}
            checked={value}
            onChange={(e) => onChange(e)}
            disabled={disabled}
        />
    );
};

type SettingProps = {
    name: string;
    Icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
    OptionIcon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
    type: 'boolean';
    label: string;
    value?: boolean;
    hideLabel?: boolean;
    inputOnly?: boolean;
    tooltip?: string;
    controlTooltip?: string;
    disabled?: boolean;
    color?: SwitchProps['color'];
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export const EmptySpan: FunctionComponent = () => <span />;

/** Renders a generic listitem that can be used to toggle application settings. . */
export const SettingListItem = (props: SettingProps) => {
    const {
        Icon = SettingsIcon,
        OptionIcon = EmptySpan,
        type,
        label,
        name,
        hideLabel,
        tooltip = '',
        controlTooltip,
        inputOnly,
        disabled,
        color,
    } = props;

    let { onChange, value } = props;
    const [stored, setSetting] = useSetting(name, value);

    /** If the component is not controlled, make it uncontrolled. */
    if (!onChange) {
        onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setSetting(e.target.checked);
        };
    }

    if (typeof value === 'undefined') value = stored as boolean;

    let input = null;
    if (type === 'boolean')
        input = (
            <BooleanSetting
                value={!!value}
                disabled={disabled}
                color={color}
                onChange={onChange}
            />
        );

    if (controlTooltip)
        input = (
            <Tooltip title={controlTooltip}>
                <span>{input}</span>
            </Tooltip>
        );

    if (inputOnly) {
        return input;
    }

    return (
        <>
            {!hideLabel && (
                <>
                    <ListItemIcon>
                        <Icon />
                    </ListItemIcon>
                    <TranslatedListItemText>{label}</TranslatedListItemText>
                </>
            )}

            <Tooltip title={tooltip}>
                <span>
                    <OptionIcon className={clsx({ disabled })} />
                </span>
            </Tooltip>
            <ListItemIcon>{input}</ListItemIcon>
        </>
    );
};

/** Provides a toggle for a userdefined  darkmode. Setting is stored in localstorage. */
export const DarkModeSetting: FunctionComponent = (props) => {
    const { darkMode, toggleDarkMode, os } = useContext(
        themeContext
    ) as UseThemeResult;

    return (
        <SettingListItem
            label="LABEL_DARKMODE"
            disabled={os}
            Icon={!darkMode ? BrightIcon : DarkIcon}
            OptionIcon={UserIcon}
            type="boolean"
            tooltip="Userdefined"
            name="darkmode"
            controlTooltip={darkMode ? 'Enable light mode' : 'Enable dark mode'}
            value={darkMode}
            onChange={toggleDarkMode}
            {...props}
        />
    );
};

/** Provides a toggle for a OS defined darkmode. Setting is stored in localstorage. */
export const DarkModeOsSetting = () => {
    const { darkMode, os, setOsValue } = useContext(
        themeContext
    ) as UseThemeResult;

    return (
        <SettingListItem
            label="LABEL_DARKMODE_OS"
            Icon={!darkMode ? BrightIcon : DarkIcon}
            OptionIcon={OSIcon}
            type="boolean"
            name="darkmode-os"
            tooltip="Operating System"
            controlTooltip={
                os ? 'Use userdefined value' : 'Use OS defined value'
            }
            value={os}
            onChange={setOsValue}
        />
    );
};

export const BackgroundSetting = () => {
    const [animatedBG, setAnimatedBG] = useSetting('background', true);

    return (
        <SettingListItem
            Icon={WavesRounded}
            type="boolean"
            tooltip="USER_DEFINED"
            label="Animated Background"
            controlTooltip={
                animatedBG
                    ? 'Show a static backgrund'
                    : 'Show an animated background'
            }
            name="background"
            value={animatedBG as boolean}
            onChange={() => setAnimatedBG(!animatedBG)}
        />
    );
};

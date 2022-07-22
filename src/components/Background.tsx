/* eslint-disable no-shadow */

import { useTheme } from '@mui/material';
import clsx from 'clsx';
import React, {
    FunctionComponent,
    PropsWithChildren,
    useEffect,
    useRef,
} from 'react';

type VANTA = {
    [index: string]: any;
    CLOUDS: any;
    WAVES: any;
};
declare global {
    interface Window {
        VANTA: VANTA;
    }
}

type VantaBackgroudProps = {
    enabled?: boolean;
    light?: any;
    dark?: any;
};

export const VantaBackground: FunctionComponent<
    PropsWithChildren<VantaBackgroudProps>
> = ({
    enabled = false,
    children,
    light = SunnyBlueClouds,
    dark = DarkWaves,
}) => {
    const instance = useRef<any>();
    const theme = useTheme();
    const { type, ...rest } = theme.palette.mode === 'light' ? light : dark;
    const sharedProps = {
        el: '#bg',
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
    };

    /** Destroy the background on unmount */
    useEffect(() => {
        return () => {
            if (instance.current && instance.current.destroy)
                instance.current.destroy();
        };
    }, []);

    useEffect(() => {
        if (!window.VANTA) return;
        const fn = window.VANTA[type] || window.VANTA.CLOUDS;
        if (enabled) {
            instance.current = fn({
                ...sharedProps,
                ...rest,
            });
        } else if (instance.current && instance.current.destroy) {
            instance.current.destroy();
        }

        // eslint-disable-next-line consistent-return
        return () => {
            if (instance.current && instance.current.destroy)
                instance.current.destroy();
        };
    }, [enabled, dark, light, type]);

    useEffect(() => {
        if (instance.current && instance.current.updateUniforms) {
            Object.assign(instance.current.options, {
                ...rest,
                ...sharedProps,
            });
            instance.current.updateUniforms();
        }
    }, [sharedProps, rest]);

    return (
        <div
            id="bg"
            className={clsx(theme.palette.mode, 'min-100-vh ')}
            style={{ overflow: 'hidden' }}
        >
            {children}
        </div>
    );
};

export const SunnyBlueClouds = {
    type: 'CLOUD',
    skyColor: 0x2096d7,
    cloudColor: 0xc5c8fa,
    sunColor: 0xdc7412,
    sunlightColor: 0xe17833,
    speed: 1,
};

export const DarkWaves = {
    type: 'WAVES',
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0x252525,
    shininess: 34.0,
    waveHeight: 9.5,
    waveSpeed: 0.55,
    zoom: 0.88,
};

export const DarkFogLightCloudBackground = () => (
    <VantaBackground light={SunnyBlueClouds} dark={DarkWaves} />
);

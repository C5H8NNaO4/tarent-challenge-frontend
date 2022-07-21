/* eslint-disable no-shadow */
import { AppBarProps } from '@mui/material';
import React, { ChangeEventHandler } from 'react';

export enum Actions {
    SET_SEARCH = 'SET_SEARCH',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    SHOW_TOAST = 'SHOW_TOAST',
    HIDE_TOAST = 'HIDE_TOAST',
}

export type SearchAppBarProps = AppBarProps & {
    onChange?: ChangeEventHandler<HTMLInputElement>;
};

export type BooleanFlagMap = {
    [index: string]: boolean;
};

export type CompanyProps = {
    name: string;
    logo: string;
    location: string;
    branche: string[];
};

export type CompanyCardProps = CompanyProps & {
    width?: number;
    height?: number;
};
export type ConsunoDemoData = {
    companies: CompanyProps[];
};

export type DataLoaderState = {
    loading: boolean;
};

export type IFilterState = {
    filter: { [index: string]: boolean };
    inclusive: boolean;
};

export interface IReducerAction<V> {
    type: Actions;
    value: V;
}

export interface ISearchState {
    search: string;
}

export interface ISessionState {
    session: {
        user: User | null;
    };
}

export interface IToastsState {
    toasts: Toast[];
}

export interface User {
    id: number;
    name: string;
    permissions: number[];
}

export interface Toast {
    id: string;
    message: string;
    type: string;
}

export interface Booking {
    trainingId: number;
    userId: number;
    timeSlot: 'string';
}

export interface FailureMessage {
    errorMessage?: string;
    success: boolean;
}

export interface IReducerState
    extends ISearchState,
        ISessionState,
        IToastsState {}

export type FilterMenuProps = {
    values: string[];
    anchorEl: HTMLAnchorElement;
    onClose: React.MouseEventHandler<HTMLElement>;
};
export type BranchMenuProps = {
    anchorEl: HTMLAnchorElement;
    onClose: React.MouseEventHandler<HTMLElement>;
};

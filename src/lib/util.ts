import { AxiosError } from 'axios';
import levenshtein from 'fast-levenshtein';
import numeral from 'numeral';
import { Booking, FailureMessage, User } from '../types';
import { ShowErrorMessage } from './actions';
import { Permissions } from './permissions';

export const tokenMatches = (
    search: string,
    tokenString: string,
    searchDistance = 0
) => {
    return tokenString.split(' ').reduce((last, token) => {
        return last || nameMatches(search, token, searchDistance);
    }, false);
};

export const nameMatches = (
    name: string,
    companyName: string,
    searchDistance = 0
) => {
    if (searchDistance > 0)
        return (
            levenshtein.get(name, companyName.slice(0, name.length)) <
            searchDistance
        );
    return companyName.includes(name);
};

export const generateApiPath = (path: string, port = 4000, version = 'v1') => {
    return `http://localhost:${port}/api/${version}${path}`;
};

export const hasPermission = (user: User | null, permission: Permissions) => {
    if (!user) return false;
    return user.permissions.includes(permission);
};

export const hasBooked = (
    timeSlot: string,
    user: User | null,
    bookings: Booking[]
) => {
    return (
        user &&
        bookings.some(
            (booking) =>
                booking.timeSlot === timeSlot && booking.userId === user.id
        )
    );
};

export const handleAxiosError = (
    // eslint-disable-next-line @typescript-eslint/ban-types
    dispatch: Function,
    e: AxiosError<FailureMessage>
) => {
    const castedError = e as unknown as AxiosError<FailureMessage>;
    if (castedError?.response?.data?.errorMessage) {
        dispatch(ShowErrorMessage(castedError.response.data.errorMessage));
    } else {
        dispatch(ShowErrorMessage(castedError.message));
    }
};

export const isLoggedIn = (user: User | null) => {
    return user !== null;
};

export const isAnonymousUser = (user: User | null) => {
    return isLoggedIn(user) && user?.id === -1;
};

export const getLanguageCurrencySymbol = () => {
    return numeral(0).format('$').slice(2);
};

import { useAtom, Atom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Convert } from 'easy-currencies';

import { BooleanFlagMap } from '../types';

const map: BooleanFlagMap = {};

export const useLocalStorage = (
    name: string,
    atom: Atom<any>,
    defaultValue: any
): [any, (v: any) => void] => {
    const [value, setValue] = useAtom(atom as any);
    useEffect(() => {
        const storedValue = localStorage[name];

        let parsedValue;
        try {
            parsedValue = storedValue ? JSON.parse(storedValue) : defaultValue;
        } catch (e) {
            parsedValue = null;
        }
        if (!storedValue) {
            localStorage[name] = defaultValue;
        }

        if (!map[name]) {
            map[name] = true;
            setValue(parsedValue);
        }

        return () => {
            map[name] = false;
        };
    }, []);

    const setPersistentValue = (val: any) => {
        const string = JSON.stringify(val);
        localStorage[name] = string;
        setValue(val);
    };

    return [value, setPersistentValue];
};

const currencies: Record<string, string> = {
    de: 'EUR',
    en: 'USD',
    es: 'USD',
    fr: 'EUR',
};
export const useConvertCurrency = (amount: number) => {
    const { i18n } = useTranslation();
    const [value, setValue] = useState<number | null>(null);

    const targetCurrency = currencies[i18n.language];

    const convert = useCallback(async () => {
        if (targetCurrency === 'EUR') {
            return amount;
        }

        return Convert(amount).from('EUR').to(targetCurrency);
    }, [amount, targetCurrency]);

    useEffect(() => {
        (async () => {
            const converted = await convert();
            setValue(converted);
        })();
    }, [amount, i18n.language]);

    return value ?? amount;
};

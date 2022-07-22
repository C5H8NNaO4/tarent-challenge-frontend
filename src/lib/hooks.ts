import { Convert } from 'easy-currencies';
import { useAtom, Atom, atom, PrimitiveAtom } from 'jotai';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Instantiates a client

import { ShowErrorMessage } from './actions';
import { translate } from './util';

import { stateContext } from '../provider/StateProvider';
import { BooleanFlagMap } from '../types';

const map: BooleanFlagMap = {};

export const useLocalStorage = (
    name: string,
    storageAtom: Atom<any>,
    defaultValue: any
): [any, (v: any) => void] => {
    const [value, setValue] = useAtom(storageAtom as any);
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
    const {
        i18n: { language },
    } = useTranslation();
    const [value, setValue] = useState<number | null>(null);

    const targetCurrency = currencies[language];

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
    }, [amount, language]);

    return value ?? amount;
};

const translationCache: Record<string, Record<string, string | null>> = {};
const cacheTranslation = (
    text: string,
    language: string,
    translation: string | null
) => {
    translationCache[text] = translationCache[text] || {};
    translationCache[text][language] = translation;
};

const atoms: Record<string, PrimitiveAtom<string | null>> = {};
export const useGoogleTranslate = (
    text: string,
    { from = 'en', placeholder = '...' }
) => {
    const translationAtom = useMemo(
        // eslint-disable-next-line
        () => atoms[text] || (atoms[text] = atom<string | null>(null)),
        [text]
    );
    const [translated, setTranslated] = useAtom(translationAtom);
    const {
        i18n: { language },
    } = useTranslation();
    const { dispatch } = useContext(stateContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTranslated(null);
        setLoading(true);
    }, [language]);

    useEffect(() => {
        /**
         * We don't need to translate if source and target language are the same.
         */
        if (language === from) {
            setTranslated(text);
            setLoading(false);
            return;
        }

        /**
         * If there are multiple uses of this hook with the same text, we don't want to perform an unneccesary request.
         * The state of the atom is shared between all uses of the hook.
         * The first use of the hook fetches the result and shares it with all other uses of the hook.
         */
        if (typeof (translationCache[text] || {})[language] !== 'undefined') {
            setTranslated(translationCache[text][language]);
            setLoading(false);
            return;
        }

        (async () => {
            try {
                cacheTranslation(text, language, null);
                const result = await translate(text, {
                    to: language,
                });
                /**
                 * We cache all translations so future uses of the hook don't need to perform a network request if it has been translated before.
                 */
                cacheTranslation(text, language, result.text);
                setTranslated(result.text);
                setLoading(false);
            } catch (e) {
                dispatch(ShowErrorMessage((e as unknown as Error).message));
            }
        })();
    }, [text, language]);

    return {
        text: translated === null ? placeholder : translated,
        loading,
    };
};

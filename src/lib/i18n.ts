import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import numeral from 'numeral';
import { initReactI18next } from 'react-i18next';

import 'numeral/locales/de';
import 'numeral/locales/fr';
import 'numeral/locales/es';

import * as resources from '../locale';

const options = {
    order: ['path', 'querystring', 'navigator'],
    lookupQuerystring: 'lng',
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector)
    .init({
        detection: options,
        resources,
        keySeparator: false, // we do not use keys in form messages.welcome
        fallbackLng: 'en',
        supportedLngs: Object.keys(resources),
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

numeral.locale(i18n.language);

i18n.on('languageChanged', () => {
    numeral.locale(i18n.language);
});

export { resources };
export default i18n;

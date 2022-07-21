import {
    Alert,
    AlertProps,
    FormControlLabel,
    FormControlLabelProps,
    ListItemText,
    ListItemTextProps,
    TextField,
    TextFieldProps,
} from '@mui/material';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

/** We need to override label because MUI accepts types other than strings. We can only translate strings */
type TranslatableLabelProps = FormControlLabelProps & {
    label: string;
};

type TranslatableAlertProps = AlertProps & {
    children: string;
};

type TranslatableListItemTextProps = ListItemTextProps & {
    children: string;
};

type TranslatableTextFieldProps = TextFieldProps & {
    placeholder?: string;
    label?: string;
};

export const TranslatedLabel: FunctionComponent<TranslatableLabelProps> = (
    props
) => {
    const { label } = props;
    const { t } = useTranslation();
    return <FormControlLabel {...props} label={t(label as string) as string} />;
};

export const TranslatedAlert: FunctionComponent<TranslatableAlertProps> = (
    props
) => {
    const { children, ...rest } = props;
    const { t } = useTranslation();
    return <Alert {...rest}>{t(children)}</Alert>;
};
export const TranslatedListItemText: FunctionComponent<
    TranslatableListItemTextProps
> = (props) => {
    const { children, ...rest } = props;
    const { t } = useTranslation();
    return <ListItemText {...rest}>{t(children)}</ListItemText>;
};
export const TranslatedTextField: FunctionComponent<
    TranslatableTextFieldProps
> = (props) => {
    const { label = '', placeholder = '', ...rest } = props;
    const { t } = useTranslation();
    return (
        <TextField label={t(label)} placeholder={t(placeholder)} {...rest} />
    );
};

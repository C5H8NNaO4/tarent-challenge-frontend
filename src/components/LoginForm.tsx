import {
    Button,
    CardActionArea,
    CardActions,
    CardContent,
    TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLogin } from '../lib/session';

export const LoginForm = () => {
    const { t } = useTranslation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = useLogin(username, password);

    return (
        <>
            <CardContent>
                <TextField
                    fullWidth
                    label={t('Username')}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Box sx={{ mt: 1 }} />
                <TextField
                    fullWidth
                    type="password"
                    label={t('Password')}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </CardContent>
            <CardActionArea>
                <CardActions>
                    <Button
                        variant="contained"
                        disabled={!login || !password}
                        onClick={login}
                    >
                        {t('LOGIN')}
                    </Button>
                </CardActions>
            </CardActionArea>
        </>
    );
};

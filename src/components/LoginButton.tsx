import { TrapFocus } from '@mui/base';
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardHeader,
    Modal,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LoginForm } from './LoginForm';
import { LogoutButton } from './LogoutButton';

import { useRestoreSession } from '../lib/session';
import { isAnonymousUser, isLoggedIn } from '../lib/util';

const modalCardStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 1,
    outline: 'none',
};

export const SessionButton = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const { user } = useRestoreSession('anonymous', 'password');

    const { t } = useTranslation();

    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <Button
                color="primary"
                variant="contained"
                onClick={(e) => setAnchorEl(e.target as HTMLButtonElement)}
                tabIndex={-1}
            >
                {user?.name && user.id !== -1 ? user.name : t('LOGIN')}
            </Button>
            <TrapFocus open={Boolean(anchorEl)}>
                <Modal open={Boolean(anchorEl)} onClose={handleClose}>
                    <Card sx={modalCardStyle}>
                        {!isLoggedIn(user) || isAnonymousUser(user) ? (
                            <LoginForm />
                        ) : (
                            <>
                                <CardHeader title={user?.name} />
                                <CardActionArea>
                                    <CardActions>
                                        <LogoutButton />
                                    </CardActions>
                                </CardActionArea>
                            </>
                        )}
                    </Card>
                </Modal>
            </TrapFocus>
        </>
    );
};

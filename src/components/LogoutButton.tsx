import { Button } from '@mui/material';

import { useLogout } from '../lib/session';

export const LogoutButton = () => {
    const logout = useLogout();
    return (
        <Button variant="contained" onClick={logout}>
            Logout
        </Button>
    );
};

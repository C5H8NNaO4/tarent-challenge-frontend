import {
    ArrowUpwardOutlined,
    HelpOutline,
    KeyboardArrowDown,
} from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { SettingsMenu, SettingsMenuButton } from '../pages/SettingsPage';
import { BookButton } from './BookButton';
import { EditModeButton } from './EditModeButton';
import { SessionButton } from './LoginButton';

export const HelpButton = () => {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);
    return (
        <>
            <IconButton onClick={toggle}>
                <HelpOutline />
            </IconButton>

            <Drawer open={open} anchor="right" onClose={() => setOpen(false)}>
                <Accordion>
                    <AccordionSummary expandIcon={<KeyboardArrowDown />}>
                        <Typography>Credentials</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <CardContent sx={{ maxWidth: 420 }}>
                            <Typography>
                                You can login with two different users that have
                                different permissions each. admin / password and
                                user / password. The admin can modify timeslots
                                whereas the user can only book trainings.
                            </Typography>
                        </CardContent>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<KeyboardArrowDown />}>
                        <Typography>Search</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <CardContent sx={{ maxWidth: 420 }}>
                            <Typography>
                                You can search the listed trainings. This is
                                mainly there to occupy some space. There&apos;s
                                only three items, so you won&apos;t really need
                                to search for one.
                            </Typography>
                        </CardContent>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<KeyboardArrowDown />}>
                        <Typography>Settings</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <CardContent sx={{ maxWidth: 420 }}>
                            <Typography>
                                There are a variety of settings you can
                                configure, such as dark mode, animated
                                backgrounds and fuzzy search.
                                <SettingsMenuButton />
                            </Typography>
                        </CardContent>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<KeyboardArrowDown />}>
                        <Typography>Booking</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <CardContent sx={{ maxWidth: 420 }}>
                            <Typography>
                                To book a timeslot, you need to select it and
                                then press the{' '}
                                <BookButton
                                    slots={10}
                                    timeSlot="10:00"
                                    trainingId={0}
                                />{' '}
                                button. You can not double book a timeslot. You
                                can only book a slot if there is one available.
                                You can cancel a booked slot anytime.
                            </Typography>
                        </CardContent>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<KeyboardArrowDown />}>
                        <Typography>Admin</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <CardContent sx={{ maxWidth: 420 }}>
                            <Typography>
                                You can modify available times for each
                                training. In order to do so, please login as{' '}
                                <b>admin</b> using this button <SessionButton />{' '}
                                Then click on the{' '}
                                <EditModeButton
                                    active
                                    onClick={() => {
                                        return null;
                                    }}
                                />{' '}
                                button. This will allow you to remove a timeslot
                                by clicking on the small{' '}
                                <Chip onDelete={() => null} /> This will also
                                allow you to add a new slot by pressing the{' '}
                                <Chip label="+" /> button which appears. You can
                                change the time of an existing slot by selecting
                                it in the edit mode. This will show a time
                                picker and upon confirmation the time will be
                                updated. You can not delete slots that are
                                booked.
                                <i>
                                    (You can however modify booked slots which
                                    will render existing bookings obsolete.)
                                </i>
                            </Typography>
                        </CardContent>
                    </AccordionDetails>
                </Accordion>
            </Drawer>
        </>
    );
};

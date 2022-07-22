import { Grid } from '@mui/material';
import { FunctionComponent, useContext } from 'react';
import { nameMatches, tokenMatches } from '../../lib/util';
import { stateContext, useAppState } from '../../provider/StateProvider';
import { useSetting } from '../Settings';
import { TrainingCard, TrainingCardProps } from './TrainingCard';

type TrainingGridProps = {
    data: TrainingCardProps[] | null;
};

export const TrainingGrid: FunctionComponent<TrainingGridProps> = (props) => {
    const { data } = props;
    const { state } = useContext(stateContext);
    const [fuzzy] = useSetting('fuzzy', false);

    if (data === null) return null;

    const filtered = data.filter((training) =>
        tokenMatches(state.search, training.name, fuzzy ? 3 : 0)
    );

    return (
        <Grid container spacing={1}>
            {filtered.map((child) => {
                return (
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                        <TrainingCard {...child} />
                    </Grid>
                );
            })}
            {state.draft && (
                <Grid item xs={12} md={6} lg={4} xl={3}>
                    <TrainingCard
                        id={data.length}
                        name=""
                        trainer=""
                        availableTimeSlots={[]}
                        duration={45}
                        slots={10}
                        cost={150}
                        description=""
                        draft
                    />
                </Grid>
            )}
        </Grid>
    );
};

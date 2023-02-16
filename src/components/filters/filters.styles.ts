import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    'flex-direction': 'row',
    'flex-wrap': 'wrap',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  filterContainer: {
    display: 'flex',
    'flex-direction': 'row',
    'align-items': 'center',
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
  filterLabel: {
    ...shorthands.overflow('hidden'),
    'white-space': 'nowrap',
  },
});

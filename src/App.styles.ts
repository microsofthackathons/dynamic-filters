import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

const gridSize = 170;

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    'flex-direction': 'column',
    height: '100vh',
    'background-color': tokens.colorNeutralBackground1,
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
  },
  label: {
    'margin-right': tokens.spacingHorizontalM,
  },
  filters: {
    display: 'flex',
    'margin-top': tokens.spacingVerticalL,
    'flex-direction': 'row',
    'align-items': 'center',
  },
});

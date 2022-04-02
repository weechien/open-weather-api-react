import { DefaultTheme } from 'styled-components';

import { classicTheme } from './classic';

type Theme = 'classic';

export const getTheme = (theme?: Theme): DefaultTheme => {
  switch (theme) {
    case 'classic':
      return classicTheme;
    default:
      return classicTheme;
  }
};

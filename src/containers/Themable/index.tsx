import { FC } from 'react';
import { ThemeProvider } from 'styled-components';

import { getTheme } from '../../themes';

export const Themable: FC = ({ children }) => {
  const theme = getTheme('classic');
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

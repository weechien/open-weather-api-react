import { FC } from 'react';
import styled from 'styled-components';

const StyledLayout = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  padding: ${({ theme }) => theme.layoutPadding};

  ${({ theme }) =>
    theme.background &&
    `
      &::before {
        background-image: url(${theme.background.image});
        background-repeat: no-repeat;
        background-position: ${theme.background.position ?? 'center'};
        background-size: cover;
        content: '';
        height: 100%;
        left: 0;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: -1;
      }
  `}
`;

export const Layout: FC = ({ children }) => {
  return <StyledLayout>{children}</StyledLayout>;
};

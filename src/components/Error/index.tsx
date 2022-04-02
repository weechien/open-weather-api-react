import { FC } from 'react';
import styled from 'styled-components';

import { Icon, WarningIcon } from '../Icon';
import { Text } from '../Text';

const StyledIcon = styled(Icon)`
  width: 3rem;
  fill: ${({ theme }) => theme.colors.txModalColors.textContrast};
  flex-shrink: 0;
`;

const StyledText = styled(Text)`
  color: inherit;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledError = styled.div<{ errorType?: ErrorType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 0 2.1rem;
  font-weight: 500;
  font-size: 1.4rem;
  border-radius: ${({ theme }) => theme.globalRadius};
  text-transform: uppercase;
  min-height: 3.8rem;
  max-height: 10rem;
  overflow: hidden;
  overflow-y: auto;
  flex: 1;

  background-color: ${({ theme }) => theme.colors.txModalColors.error};
  color: ${({ theme }) => theme.colors.txModalColors.textContrast};

  ${({ errorType, theme }) =>
    errorType === 'warning' &&
    `
    background-color: ${theme.colors.txModalColors.warning};
  `}
`;

type ErrorType = 'error' | 'warning';
export interface TxErrorProps {
  errorText?: string;
  errorType?: ErrorType;
}

export const Error: FC<TxErrorProps> = ({ errorText, errorType, children, ...props }) => {
  return (
    <StyledError errorType={errorType} {...props}>
      <StyledIcon Component={WarningIcon} />

      <StyledText>{errorText || 'Unknown error'}</StyledText>
    </StyledError>
  );
};

import { ElementType, FC } from 'react';
import styled from 'styled-components';
import { Icon } from '../../Icon';

const Container = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: ${({ theme }) => theme.globalRadius};
  padding: 0.6rem;
  transition: opacity 200ms ease-in-out;
  width: 100%;
  position: relative;
  flex-shrink: 0;

  ${(props) =>
    props.selected &&
    `
      color: var(--dropdown-selected-color);
      background: var(--dropdown-selected-background);
  `}

  :hover {
    opacity: 0.8;
  }
`;

const StyledIcon = styled(Icon)`
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 0.8rem;
  flex-shrink: 0;
`;

interface ButtonIconProps {
  icon: ElementType;
  onClick?: () => void;
}

export const ButtonIcon: FC<ButtonIconProps> = ({ icon, onClick, ...props }) => {
  return (
    <Container onClick={onClick} {...props}>
      <StyledIcon Component={icon} />
    </Container>
  );
};

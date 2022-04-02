import { ElementType, SVGProps, forwardRef } from 'react';
import styled from 'styled-components';

import { ReactComponent as ArrowDownIcon } from '../../assets/icons/arrow-down.svg';
import { ReactComponent as ChevronRightIcon } from '../../assets/icons/chevron-right.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import { ReactComponent as WarningIcon } from '../../assets/icons/warning.svg';

import { styledSystem, StyledSystemProps, TypographyProps } from '../styledSystem';

export interface IconProps
  extends SVGProps<SVGElement>,
    Omit<StyledSystemProps, keyof TypographyProps | 'height' | 'width' | 'opacity' | 'display' | 'order' | 'overflow'> {
  Component: ElementType;
  color?: string;
  size?: string;
  onClick?: () => void;
}

export const Icon = styled(forwardRef(({ Component, ...props }: IconProps, ref) => <Component {...props} ref={ref} />))`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  fill: ${({ theme, color, fill }) => fill ?? color ?? theme.colors.secondary};
  width: ${({ size }) => size ?? 'initial'};
  height: ${({ size }) => size ?? 'initial'};
  ${styledSystem};
`;

export { ArrowDownIcon, ChevronRightIcon, SearchIcon, TrashIcon, WarningIcon };

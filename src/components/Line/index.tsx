import { FC } from 'react';
import styled from 'styled-components';

export interface LineProps {
  className?: string;
  backgroundColor?: string;
  width?: number;
  height?: number;
  margin?: string;
}

const StyledLine = styled.div<{ backgroundColor?: string; width?: number; height?: number; margin?: string }>`
  background-color: ${(props) => props.backgroundColor || props.theme.colors.onPrimaryVariant};
  height: ${(props) => props.height || 1}px;
  width: ${(props) => props.width || 100}%;
  margin: ${(props) => props.margin || '16px 0px'};
`;

export const Line: FC<LineProps> = ({ className, backgroundColor: backgroundColor, width, height, ...props }) => (
  <StyledLine className={className} backgroundColor={backgroundColor} width={width} height={height} {...props} />
);

import * as React from 'react';
import { InverseContext, useIsInverse } from '../../inverse';
import { convertStyleValueToString } from '../../utils';
import styled from '@emotion/styled';

/**
 * @children required
 */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  isInverse?: boolean;
  /**
   * Left/right padding, set by CSS.  If a number is provided, value will be in pixels
   */
  gutterWidth?: number | string;
  /**
   * Max-width of the component, set by CSS.  If a number is provided, value will be in pixels
   */
  maxWidth?: number | string;
  testId?: string;
}

const StyledContainer = styled.div<{
  gutterWidth: string;
  isInverse?: boolean;
  maxWidth: string;
}>`
  background: ${props =>
    props.isInverse ? 'var(--colors-foundation)' : 'var(--colors-neutral08)'};
  color: ${props =>
    props.isInverse ? 'var(--colors-neutral08)' : 'var(--colors-neutral)'};
  display: flow-root;
  margin: 0 auto;
  max-width: ${props => props.maxWidth};
  padding: ${props => `0 ${props.gutterWidth}`};
`;

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => {
    const {
      children,
      gutterWidth = 'var(--spaceScale-spacing06)',
      maxWidth,
      testId,
      ...other
    } = props;

    const gutterWidthString = convertStyleValueToString(gutterWidth);
    const maxWidthString = convertStyleValueToString(maxWidth, 'none');

    const isInverse = useIsInverse(props.isInverse);

    return (
      <InverseContext.Provider
        value={{
          isInverse,
        }}
      >
        <StyledContainer
          ref={ref}
          data-testid={testId}
          gutterWidth={gutterWidthString}
          isInverse={isInverse}
          maxWidth={maxWidthString}
          {...other}
        >
          {children}
        </StyledContainer>
      </InverseContext.Provider>
    );
  }
);
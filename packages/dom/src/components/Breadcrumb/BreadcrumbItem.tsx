import * as React from 'react';
import styled from '@emotion/styled';
import { Hyperlink } from '../Hyperlink';
import { useIsInverse } from '../../inverse';
import { ChevronRightIcon } from 'react-magma-icons';

/**
 * @children required
 */
export interface BreadcrumbItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  testId?: string;
  /**
   * The href value of the link. If left blank, the breadcrumb item will render as a span with aria-current="page" on it.
   */
  to?: string;
}

const StyledItem = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
`;

const StyledSpan = styled.span<{ isInverse?: boolean }>`
  color: ${props =>
    props.isInverse ? 'var(--colors-neutral08)' : 'var(--colors-neutral03)'};

  svg {
    margin: 0 var(--spaceScale-spacing02);
  }
`;

export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  BreadcrumbItemProps
>((props, ref) => {
  const { children, to, testId, ...other } = props;
  const isInverse = useIsInverse();

  return (
    <StyledItem {...other} data-testid={testId} ref={ref}>
      {to ? (
        <>
          <Hyperlink to={to} isInverse={isInverse}>
            {children}
          </Hyperlink>
          <StyledSpan isInverse={isInverse}>
            <ChevronRightIcon size={20} />
          </StyledSpan>
        </>
      ) : (
        <StyledSpan aria-current="page" isInverse={isInverse}>
          {children}
        </StyledSpan>
      )}
    </StyledItem>
  );
});
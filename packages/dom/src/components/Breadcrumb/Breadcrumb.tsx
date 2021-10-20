import * as React from 'react';
import styled from '@emotion/styled';
import { I18nContext } from '../../i18n';
import { InverseContext, useIsInverse } from '../../inverse';

/**
 * @children required
 */
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  isInverse?: boolean;
  testId?: string;
}

const StyledList = styled.ol<BreadcrumbProps>`
  display: flex;
  flex-wrap: wrap;
  font-size: var(--typeScale-size02-fontSize);
  line-height: var(--typeScale-size02-lineHeight);
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Breadcrumb = React.forwardRef<HTMLOListElement, BreadcrumbProps>(
  (props, ref) => {
    const {
      'aria-label': ariaLabel,
      children,
      isInverse: isInverseProp,
      testId,
      ...other
    } = props;

    const i18n = React.useContext(I18nContext);
    const isInverse = useIsInverse(isInverseProp);

    return (
      <InverseContext.Provider value={{ isInverse }}>
        <nav
          {...other}
          aria-label={ariaLabel ? ariaLabel : i18n.breadcrumb.navAriaLabel}
          data-testid={testId}
        >
          <StyledList isInverse={isInverse} ref={ref}>
            {children}
          </StyledList>
        </nav>
      </InverseContext.Provider>
    );
  }
);

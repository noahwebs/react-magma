import React from 'react';
import {
  inputBaseStyles,
  inputWrapperStyles,
  InputBaseStylesProps,
  InputWrapperStylesProps,
} from '../InputBase';
import { defaultComponents, SelectComponents } from '../Select/components';
import styled from '@emotion/styled';

const StyledButton = styled.div<InputBaseStylesProps & InputWrapperStylesProps>`
  ${inputBaseStyles}
  ${inputWrapperStyles}

  align-items: center;
  display: flex;
  height: auto;
  min-height: var(--spaceScale-spacing09);
  padding: 0 var(--spaceScale-spacing03) 0
    var(--spaceScale-spacing02);
  text-align: left;
`;

const ChildrenContainer = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
`;

interface SelectTriggerButtonInterface<T> {
  ariaDescribedBy?: string;
  children: React.ReactNode | React.ReactNode[];
  customComponents?: SelectComponents<T>;
  hasError?: boolean;
  disabled?: boolean;
  isInverse?: boolean;
  style?: React.CSSProperties;
  toggleButtonProps: any;
  tabindex?: number;
}

export function SelectTriggerButton<T>(props: SelectTriggerButtonInterface<T>) {
  const {
    ariaDescribedBy,
    children,
    customComponents,
    hasError,
    disabled,
    isInverse,
    style: passedInStyle,
    toggleButtonProps,
  } = props;

  const { DropdownIndicator } = defaultComponents<T>({
    ...customComponents,
  });

  const style = { ...passedInStyle, cursor: 'default' };

  return (
    <StyledButton
      {...toggleButtonProps}
      aria-describedby={ariaDescribedBy}
      data-testid="selectTriggerButton"
      hasError={hasError}
      disabled={disabled}
      isInverse={isInverse}
      role="button"
      style={style}
      tabIndex={disabled ? undefined : 0}
    >
      <ChildrenContainer>{children}</ChildrenContainer>
      <DropdownIndicator />
    </StyledButton>
  );
}
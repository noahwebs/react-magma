import * as React from 'react';
import { StyledButton } from '../StyledButton';
import styled from '@emotion/styled';
import { IconProps } from '../Icon/utils';
import { Omit } from '../utils';

export enum ButtonVariant {
  solid = 'solid', //default
  outline = 'outline',
  link = 'link'
}

export enum ButtonColor {
  primary = 'primary', //default
  secondary = 'secondary',
  success = 'success',
  danger = 'danger',
  marketing = 'marketing'
}

export enum ButtonShape {
  fill = 'fill', //default
  leftCap = 'leftCap',
  rightCap = 'rightCap',
  round = 'round' // default for icon only buttons
}

export enum ButtonSize {
  large = 'large',
  medium = 'medium', //default
  small = 'small'
}

export enum ButtonTextTransform {
  uppercase = 'uppercase', //default
  none = 'none'
}

export enum ButtonIconPosition {
  left = 'left',
  right = 'right'
}

export enum ButtonType {
  button = 'button',
  submit = 'submit',
  reset = 'reset'
}

export interface ButtonStyles {
  block?: boolean;
  color?: ButtonColor;
  inverse?: boolean;
  shape?: ButtonShape;
  size?: ButtonSize;
  textTransform?: ButtonTextTransform;
  type?: ButtonType;
  variant?: ButtonVariant;
}

interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ariaExpanded?: boolean;
  ariaLabel?: string;
  as?: any;
  autoFocus?: boolean;
  href?: string;
  testId?: string;
  ref?: any;
  theme?: any;
  to?: string;
}

export type ButtonProps = BaseButtonProps & ButtonStyles;

export interface IconOnlyButtonProps extends Omit<ButtonProps, 'children'> {
  icon: React.ReactElement<IconProps>;
  ariaLabel: string;
}

interface IconTextButtonProps extends ButtonProps {
  icon: React.ReactElement<IconProps>;
  children: React.ReactChild | React.ReactChild[];
  iconPosition?: ButtonIconPosition;
}

export type MergedButtonProps =
  | ButtonProps
  | IconTextButtonProps
  | IconOnlyButtonProps;

export interface SpanProps {
  size?: ButtonSize;
}

const SpanTextLeft = styled.span<SpanProps>`
  padding-right: ${props => (props.size === 'large' ? '15px' : '10px')};
`;

const SpanTextRight = styled.span<SpanProps>`
  padding-left: ${props => (props.size === 'large' ? '15px' : '10px')};
`;

function getIconSize(size) {
  switch (size) {
    case 'large':
      return 24;
    case 'small':
      return 14;
    default:
      return 18;
  }
}

function getIconWithTextSize(size) {
  switch (size) {
    case 'large':
      return 20;
    case 'small':
      return 12;
    default:
      return 16;
  }
}

function instanceOfIconText(object: any): object is IconTextButtonProps {
  return 'icon' in object && 'children' in object;
}

function instanceOfIconOnly(object: any): object is IconOnlyButtonProps {
  return 'icon' in object && !('children' in object);
}

export const Button: React.FunctionComponent<
  MergedButtonProps
> = React.forwardRef((props: MergedButtonProps, ref: any) => {
  let icon;
  let iconPosition;
  let children;
  const {
    ariaExpanded,
    ariaLabel,
    as,
    inverse,
    block,
    color,
    href,
    testId,
    shape,
    size,
    variant,
    textTransform,
    to,
    ...other
  } = props;

  if (instanceOfIconOnly(props)) {
    icon = props.icon;
  } else if (instanceOfIconText(props)) {
    icon = props.icon;
    iconPosition = props.iconPosition;
    children = props.children;
  } else {
    children = props.children;
  }

  if (icon && children) {
    return (
      <StyledButton
        {...other}
        testId={testId}
        ref={ref}
        ariaLabel={ariaLabel}
        ariaExpanded={ariaExpanded}
        as={as}
        block={block}
        color={color ? color : ButtonColor.primary}
        inverse={inverse}
        href={href}
        shape={shape ? shape : ButtonShape.fill}
        size={size ? size : ButtonSize.medium}
        textTransform={
          textTransform ? textTransform : ButtonTextTransform.uppercase
        }
        to={to}
        variant={variant ? variant : ButtonVariant.solid}
      >
        {iconPosition === ButtonIconPosition.right && (
          <SpanTextLeft size={size}>{children} </SpanTextLeft>
        )}
        {React.Children.only(
          React.cloneElement(icon, { size: getIconWithTextSize(size) })
        )}
        {iconPosition !== ButtonIconPosition.right && (
          <SpanTextRight size={size}>{children}</SpanTextRight>
        )}
      </StyledButton>
    );
  } else if (icon && !children) {
    return (
      <StyledButton
        {...other}
        testId={testId}
        ref={ref}
        ariaExpanded={ariaExpanded}
        ariaLabel={ariaLabel}
        as={as}
        color={color ? color : ButtonColor.primary}
        iconOnly
        inverse={inverse}
        href={href}
        shape={shape ? shape : ButtonShape.round}
        size={size ? size : ButtonSize.medium}
        to={to}
        variant={variant ? variant : ButtonVariant.solid}
      >
        {React.Children.only(
          React.cloneElement(icon, { size: getIconSize(size) })
        )}
      </StyledButton>
    );
  }

  return (
    <StyledButton
      {...other}
      testId={testId}
      ref={ref}
      as={as}
      ariaExpanded={ariaExpanded}
      ariaLabel={ariaLabel}
      block={block}
      color={color ? color : ButtonColor.primary}
      href={href}
      inverse={inverse}
      shape={shape ? shape : ButtonShape.fill}
      size={size ? size : ButtonSize.medium}
      textTransform={
        textTransform ? textTransform : ButtonTextTransform.uppercase
      }
      to={to}
      variant={variant ? variant : ButtonVariant.solid}
    >
      {children}
    </StyledButton>
  );
});

import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { ThemeContext } from '../../theme/ThemeContext';
import { ButtonVariant, ButtonType, ButtonSize, ButtonShape } from '../Button';
import { IconButton } from '../IconButton';
import { IconProps } from 'react-magma-icons';

export enum InputSize {
  large = 'large',
  medium = 'medium', //default
}

export enum InputType {
  email = 'email',
  number = 'number',
  password = 'password',
  search = 'search',
  text = 'text', // default
}

export interface InputBaseProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerStyle?: React.CSSProperties;
  hasError?: boolean;
  icon?: React.ReactElement<IconProps>;
  iconAriaLabel?: string;
  iconPosition?: InputIconPosition;
  iconRef?: React.Ref<HTMLButtonElement>;
  inputSize?: InputSize;
  inputStyle?: React.CSSProperties;
  isInverse?: boolean;
  onIconClick?: () => void;
  onIconKeyDown?: (event) => void;
  ref?: React.Ref<HTMLInputElement>;
  testId?: string;
  theme?: any;
  type?: InputType;
}

export enum InputIconPosition {
  left = 'left',
  right = 'right',
}

const InputWrapper = styled.div`
  align-items: center;
  display: flex;
  position: relative;
`;

export const inputBaseStyles = props => css`
  background: ${props.theme.colors.neutral08};
  border: 1px solid;
  border-color: ${props.isInverse
    ? props.theme.colors.neutral08
    : props.theme.colors.neutral03};
  border-radius: 4px;
  color: ${props.theme.colors.neutral01};
  display: block;
  font-size: 1rem;
  font-family: ${props.theme.bodyFont};
  height: 40px;
  line-height: 24px;
  padding: 0 8px;
  -webkit-appearance: none;
  width: 100%;

  ${props.iconPosition === 'left' &&
  css`
    padding-left: 35px;
  `}

  ${props.iconPosition === 'right' &&
  css`
    padding-right: 35px;
  `}
  
  ${props.hasError &&
  css`
    border-color: ${props.theme.colors.danger};
    box-shadow: 0 0 0 1px
      ${props.isInverse
        ? props.theme.colors.neutral08
        : props.theme.colors.danger};
  `}

  ${props.inputSize === 'large' &&
  css`
    font-size: 22px;
    height: 58px;
    line-height: 33px;
    padding: 0 15px;
  `}

    ${props.iconPosition === 'left' &&
  props.inputSize === 'large' &&
  css`
    padding-left: 50px;
  `}
  
      ${props.iconPosition === 'right' &&
  props.inputSize === 'large' &&
  css`
    padding-right: 50px;
  `}

  &::placeholder {
    color: ${props.theme.colors.neutral03};
    opacity: 1;
  }

  &:focus {
    outline: 2px dotted
      ${props.isInverse
        ? props.theme.colors.focusInverse
        : props.theme.colors.focus};
    outline-offset: 4px;
  }

  ${props.disabled &&
  css`
    background: ${props.theme.colors.neutral07};
    border-color: ${props.theme.colors.neutral05};
    color: ${props.theme.colors.disabledText};
    cursor: not-allowed;

    &::placeholder {
      color: ${props.theme.colors.disabledText};
    }
  `}
`;

const StyledInput = styled.input<InputBaseProps>`
  ${inputBaseStyles}
`;

const IconWrapper = styled.span<{
  iconPosition?: InputIconPosition;
  inputSize?: InputSize;
}>`
  color: ${props => props.theme.colors.neutral01};
  left: ${props => (props.iconPosition === 'left' ? '12px' : 'auto')};
  right: ${props => (props.iconPosition === 'right' ? '12px' : 'auto')};
  position: absolute;
  margin-top: -11px;
  top: 50%;

  ${props =>
    props.inputSize === 'large' &&
    css`
      left: ${props.iconPosition === 'left' ? '16px' : 'auto'};
      right: ${props.iconPosition === 'right' ? '16px' : 'auto'};
      margin-top: -10px;
    `}
`;

const StyledIconButton = styled(IconButton)<{ size: ButtonSize }>`
  position: absolute;
  bottom: 0;
  right: 0;

  ${props =>
    props.size === 'large' &&
    css`
      bottom: 2px;

      svg {
        height: 21px;
        width: 21px;
      }
    `}
`;

function getIconSize(size) {
  switch (size) {
    case 'large':
      return 21;
    default:
      return 17;
  }
}

export const InputBase: React.FunctionComponent<InputBaseProps> = React.forwardRef(
  (props: InputBaseProps, ref: React.Ref<HTMLInputElement>) => {
    const {
      children,
      containerStyle,
      defaultValue,
      hasError,
      icon,
      iconAriaLabel,
      iconRef,
      onIconClick,
      onIconKeyDown,
      inputSize,
      inputStyle,
      testId,
      type,
      ...other
    } = props;

    const theme = React.useContext(ThemeContext);

    const iconPosition =
      icon && onIconClick
        ? InputIconPosition.right
        : icon && !props.iconPosition
        ? InputIconPosition.left
        : props.iconPosition;

    const [value, setValue] = React.useState<
      string | ReadonlyArray<string> | number
    >(props.defaultValue || props.value || '');

    React.useEffect(() => {
      if (props.value !== undefined && props.value !== null) {
        setValue(props.value);
      }
    }, [props.value]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      props.onChange &&
        typeof props.onChange === 'function' &&
        props.onChange(event);

      setValue(event.target.value);
    }

    return (
      <InputWrapper style={containerStyle}>
        <StyledInput
          {...other}
          aria-invalid={hasError}
          data-testid={testId}
          hasError={hasError}
          iconPosition={iconPosition}
          inputSize={inputSize ? inputSize : InputSize.medium}
          ref={ref}
          onChange={handleChange}
          style={inputStyle}
          theme={theme}
          type={type ? type : InputType.text}
          value={value}
        />
        {icon && !onIconClick && (
          <IconWrapper
            aria-label={iconAriaLabel}
            iconPosition={iconPosition}
            inputSize={inputSize ? inputSize : InputSize.medium}
            theme={theme}
          >
            {React.Children.only(
              React.cloneElement(icon, {
                size: getIconSize(inputSize ? inputSize : InputSize.medium),
              })
            )}
          </IconWrapper>
        )}

        {onIconClick && (
          <StyledIconButton
            aria-label={iconAriaLabel}
            icon={icon}
            onClick={onIconClick}
            onKeyDown={onIconKeyDown}
            ref={iconRef}
            shape={ButtonShape.fill}
            size={
              inputSize === InputSize.large
                ? ButtonSize.large
                : ButtonSize.small
            }
            theme={theme}
            type={ButtonType.button}
            variant={ButtonVariant.link}
          />
        )}
        {children}
      </InputWrapper>
    );
  }
);
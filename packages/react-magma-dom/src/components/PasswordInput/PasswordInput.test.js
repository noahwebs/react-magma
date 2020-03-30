import React from 'react';
import { axe } from 'jest-axe';
import { PasswordInput } from '.';
import { render, fireEvent } from '@testing-library/react';
import { magma } from '../../theme/magma';

describe('PasswordInput', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<PasswordInput testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('renders a show/hide button on password inputs', () => {
    const { getByText } = render(<PasswordInput />);
    const showText = getByText('Show');
    expect(showText).toBeInTheDocument();
    expect(showText).toHaveAttribute(
      'aria-label',
      'Show password. Note: this will visually expose your password on the screen'
    );
    expect(getByText('Password is now hidden')).toBeInTheDocument();
  });

  it('renders a show/hide button on password inputs with custom text', () => {
    const { getByText } = render(
      <PasswordInput
        showPasswordButtonAriaLabel="Test button aria label"
        showPasswordButtonText="Test button text"
        hiddenPasswordAnnounceText="Test announce text"
      />
    );

    expect(getByText('Test button text')).toBeInTheDocument();
    expect(getByText('Test button text')).toHaveAttribute(
      'aria-label',
      'Test button aria label'
    );
    expect(getByText('Test announce text')).toBeInTheDocument();
  });

  it('does not render a show/hide button when isPasswordMaskButtonHidden is set to true', () => {
    const { queryByText } = render(
      <PasswordInput isPasswordMaskButtonHidden />
    );

    expect(queryByText('Show')).not.toBeInTheDocument();
  });

  it('unmasks password when show button is clicked', () => {
    const labelText = 'test label';
    const { getByText, getByLabelText } = render(
      <PasswordInput labelText={labelText} />
    );
    const button = getByText('Show');
    const input = getByLabelText(labelText);

    fireEvent.click(button);

    expect(input).toHaveProperty('type', 'text');
    expect(button).toHaveTextContent('Hide');
    expect(button).toHaveAttribute('aria-label', 'Hide password');
    expect(getByText('Password is now visible')).toBeInTheDocument();
  });

  it('unmasks password when show button is clicked with custom text', () => {
    const labelText = 'test label';
    const { getByText, getByLabelText } = render(
      <PasswordInput
        labelText={labelText}
        hidePasswordButtonAriaLabel="Test button aria label"
        hidePasswordButtonText="Test button text"
        shownPasswordAnnounceText="Test announce text"
      />
    );
    const button = getByText('Show');
    const input = getByLabelText(labelText);

    fireEvent.click(button);

    expect(input).toHaveProperty('type', 'text');
    expect(button).toHaveTextContent('Test button text');
    expect(button).toHaveAttribute('aria-label', 'Test button aria label');
    expect(getByText('Test announce text')).toBeInTheDocument();
  });

  it('masks password when the hide button is clicked', () => {
    const labelText = 'test label';
    const { getByText, getByLabelText } = render(
      <PasswordInput labelText={labelText} />
    );
    const button = getByText('Show');
    const input = getByLabelText(labelText);

    fireEvent.click(button);

    expect(button).toHaveTextContent('Hide');

    fireEvent.click(button);

    expect(button).toHaveTextContent('Show');
    expect(input).toHaveProperty('type', 'password');
  });
});

it('should trigger the passed in onChange when value of the input is changed', () => {
  const targetValue = 'Change';
  const onChangeSpy = jest.fn();
  const labelText = 'test label';
  const { getByLabelText } = render(
    <PasswordInput labelText={labelText} onChange={onChangeSpy} value="" />
  );

  fireEvent.change(getByLabelText(labelText), {
    target: { value: targetValue }
  });

  expect(onChangeSpy).toHaveBeenCalledTimes(1);
});

it('should render an input with a correctly styled helper message', () => {
  const testMessage = 'Test message';
  const { getByTestId } = render(<PasswordInput helperMessage={testMessage} />);

  const helperMessage = getByTestId('inputMessage');

  expect(helperMessage).toHaveStyleRule('color', magma.colors.neutral03);
});

it('should render an input with a correctly styled error message', () => {
  const labelText = 'test label';
  const testHelperMessage = 'Test helper message';
  const testErrorMessage = 'Test error message';
  const { getByTestId, getByLabelText, queryByText } = render(
    <PasswordInput
      errorMessage={testErrorMessage}
      helperMessage={testHelperMessage}
      labelText={labelText}
    />
  );

  const errorMessage = getByTestId('inputMessage');

  expect(errorMessage).toBeInTheDocument();

  expect(getByLabelText(labelText)).toHaveStyleRule(
    'border-color',
    magma.colors.danger
  );

  expect(errorMessage).toHaveStyleRule('background', 'none');
  expect(errorMessage).toHaveStyleRule('color', magma.colors.danger);

  const helperMessage = queryByText(testHelperMessage);

  expect(helperMessage).not.toBeInTheDocument();
});

it('should render the input with visually hidden label text', () => {
  const labelText = 'test label';
  const { getByText } = render(
    <PasswordInput labelText={labelText} isLabelVisuallyHidden />
  );
  expect(getByText(labelText)).toHaveStyleRule('height', '1px');
});

describe('sizes', () => {
  it('should render a default input with correct styles', () => {
    const labelText = 'test label';
    const { container, getByLabelText } = render(
      <PasswordInput labelText={labelText} />
    );

    const label = container.querySelector('label');
    const input = getByLabelText(labelText);

    expect(label).toHaveStyleRule('font-size', '13px');

    expect(input).toHaveStyleRule('font-size', '1rem');
    expect(input).toHaveStyleRule('height', '37px');
  });

  it('should render a large input with correct styles', () => {
    const labelText = 'test label';
    const { container, getByLabelText } = render(
      <PasswordInput labelText={labelText} inputSize="large" />
    );

    const label = container.querySelector('label');
    const input = getByLabelText(labelText);

    expect(label).toHaveStyleRule('font-size', '16px');

    expect(input).toHaveStyleRule('font-size', '22px');
    expect(input).toHaveStyleRule('height', '58px');
    expect(input).toHaveStyleRule('padding', '0 15px');
  });
});

it('Does not violate accessibility standards', () => {
  const { container } = render(<PasswordInput labelText="test label" />);
  return axe(container.innerHTML).then(result => {
    return expect(result).toHaveNoViolations();
  });
});
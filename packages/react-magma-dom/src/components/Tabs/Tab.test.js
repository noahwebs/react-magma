import React from 'react';
import { Tab } from './Tab';
import { CheckIcon } from '../Icon/types/CheckIcon';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { magma } from '../../theme/magma';
import { Tabs } from '.';

describe('Tab', () => {
  it('Should correctly apply the testId', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <Tab testId={testId} ariaLabel="test">
        Tab Text
      </Tab>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render children', () => {
    const testId = 'test-id';

    const { getByText } = render(<Tab testId={testId}>Test</Tab>);
    expect(getByText('Test'));
  });

  it('should render tab as passed in component', () => {
    const { getByText } = render(
      <Tab
        component={
          <a href="google.com" data-testid="child">
            Test Component
          </a>
        }
      />
    );

    expect(getByText('Test Component')).toBeInTheDocument();
  });

  it('should have aria-selected attribute if tab is active', () => {
    const testId = 'test-id';

    const { getByTestId, rerender } = render(
      <Tab testId={testId} ariaLabel="test" isActive={true}>
        Tab Text
      </Tab>
    );
    const component = getByTestId(testId);

    expect(component).toHaveAttribute('aria-selected', 'true');

    rerender(
      <Tab testId={testId} ariaLabel="test" isActive={false}>
        Tab Text
      </Tab>
    );

    expect(component).toHaveAttribute('aria-selected', 'false');
  });

  it('should be disabled', () => {
    const testId = 'test-id';

    const { getByTestId, rerender } = render(
      <Tab testId={testId} ariaLabel="test" disabled={true}>
        Tab Text
      </Tab>
    );
    const component = getByTestId(testId);

    expect(component).toHaveProperty('disabled', true);
    expect(component).toBeDisabled();

    rerender(
      <Tab testId={testId} ariaLabel="test" disabled={false}>
        Tab Text
      </Tab>
    );

    expect(component).toHaveProperty('disabled', false);
    expect(component).not.toBeDisabled();
  });

  it('should render icon', () => {
    const icon = <CheckIcon size={18} />;
    const { container } = render(<Tab icon={icon}>Tab With Icon</Tab>);

    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('should change color when isInverse prop is true', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <Tab testId={testId} isInverse={true}>
        Inverse Tab
      </Tab>
    );

    expect(getByTestId(testId)).toHaveStyleRule(
      'color',
      magma.colors.neutral08
    );
  });

  it('should render a vertical tab with the correct styles', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <Tab testId={testId} orientation="vertical">
        Vertical Tab
      </Tab>
    );

    expect(getByTestId(testId)).toHaveStyleRule('align-items', 'flex-start');
    expect(getByTestId(testId)).toHaveStyleRule('text-align', 'left');
    expect(getByTestId(testId)).toHaveStyleRule('width', '100%');
  });

  it('should render a fullWidth tab with the correct styles', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <Tab testId={testId} isFullWidth>
        Full Width Tab
      </Tab>
    );

    expect(getByTestId(testId)).toHaveStyleRule('flex-shrink', '1');
  });

  it('should show icon in top position', () => {
    const testId = 'test-id';

    const icon = <CheckIcon size={18} />;
    const { container, getByTestId, rerender } = render(
      <Tab testId={testId} icon={icon} iconPosition="top">
        Tab
      </Tab>
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('span')).toHaveStyleRule(
      'margin',
      '0 0 5px'
    );
    expect(getByTestId(testId)).toHaveStyleRule('flex-direction', 'column');
    expect(getByTestId(testId)).toHaveStyleRule('align-items', 'center');

    rerender(
      <Tab testId={testId} icon={icon} iconPosition="left">
        Tab
      </Tab>
    );

    expect(container.querySelector('span')).toHaveStyleRule(
      'margin',
      '0 15px 0 0'
    );
    expect(getByTestId(testId)).not.toHaveStyleRule('flex-direction', 'column');
  });

  it('should show icon in left position', () => {
    const testId = 'test-id';

    const icon = <CheckIcon size={18} />;
    const { container, getByTestId } = render(
      <Tab testId={testId} icon={icon} iconPosition="left">
        Tab
      </Tab>
    );

    expect(container.querySelector('span')).toHaveStyleRule(
      'margin',
      '0 15px 0 0'
    );
    expect(getByTestId(testId)).not.toHaveStyleRule('flex-direction', 'column');
  });
});

describe('Test for accessibility', () => {
  it('Does not violate accessibility standards', () => {
    const testId = 'test-id';
    const { container } = render(
      <Tabs>
        <Tab testId={testId} ariaLabel="test">
          Tab Text
        </Tab>
      </Tabs>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
import React from 'react';
import { Table, TableCell, TableRow, TableRowColor } from '.';
import { render } from '@testing-library/react';
import { magma } from '../../theme/magma';

describe('Table Row', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<TableRow testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  describe('colors', () => {
    it('should render a table row with success styles', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Table>
          <TableRow color={TableRowColor.success} testId={testId}>
            <TableCell />
          </TableRow>
        </Table>
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'background',
        magma.colors.success
      );
      expect(getByTestId(testId)).toHaveStyleRule(
        'color',
        magma.colors.neutral08
      );
    });

    it('should render a table row with danger styles', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <TableRow color={TableRowColor.danger} testId={testId} />
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'background',
        magma.colors.danger
      );
      expect(getByTestId(testId)).toHaveStyleRule(
        'color',
        magma.colors.neutral08
      );
    });

    it('should render a table row with warning styles', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <TableRow color={TableRowColor.warning} testId={testId} />
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'background',
        magma.colors.pop04
      );
      expect(getByTestId(testId)).toHaveStyleRule(
        'color',
        magma.colors.neutral
      );
    });

    it('should render a table row with info styles', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <TableRow color={TableRowColor.info} testId={testId} />
      );

      expect(getByTestId(testId)).toHaveStyleRule(
        'background',
        magma.colors.primary
      );
      expect(getByTestId(testId)).toHaveStyleRule(
        'color',
        magma.colors.neutral08
      );
    });
  });
});

import * as React from 'react';
import { useIsInverse } from '../../inverse';
import {
  TypographyVisualStyle,
  TypographyColor,
  TypographyContextVariant,
  TypographyComponent,
} from '../Typography';

/**
 * @children required
 */
export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * The color of the component, helping to convey meaning or relative emphasis
   * @default TypographyColor.default
   */
  color?: TypographyColor;
  /**
   * Additional styles for typography based on the context of the content
   * @default TypographyContextVariant.default
   */
  contextVariant?: TypographyContextVariant;
  isInverse?: boolean;
  /**
   * If true, the component will not have the default top and bottom margin and instead will a margin value of 0
   * @default false
   */
  noMargins?: boolean;
  testId?: string;
  /**
   * @internal
   */
  /**
   * Applies visual styles including font-size, font-weight, line-height and margins
   * @default TypographyVisualStyle.bodyMedium
   */
  visualStyle?: TypographyVisualStyle;
}

export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  (props, ref) => {
    const { color, testId, visualStyle, children, ...other } = props;

    return (
      <TypographyComponent
        {...other}
        color={color || TypographyColor.default}
        data-testid={testId}
        isInverse={useIsInverse(props.isInverse)}
        ref={ref}
        visualStyle={visualStyle || TypographyVisualStyle.bodyMedium}
      >
        {children}
      </TypographyComponent>
    );
  }
);
import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 40 40',
  paths: [
    {
      d:
        'M0,31.1111111 L0,35.5555556 L13.3333333,35.5555556 L13.3333333,31.1111111 L0,31.1111111 Z M0,4.44444444 L0,8.88888889 L22.2222222,8.88888889 L22.2222222,4.44444444 L0,4.44444444 Z M22.2222222,40 L22.2222222,35.5555556 L40,35.5555556 L40,31.1111111 L22.2222222,31.1111111 L22.2222222,26.6666667 L17.7777778,26.6666667 L17.7777778,40 L22.2222222,40 Z M8.88888889,13.3333333 L8.88888889,17.7777778 L0,17.7777778 L0,22.2222222 L8.88888889,22.2222222 L8.88888889,26.6666667 L13.3333333,26.6666667 L13.3333333,13.3333333 L8.88888889,13.3333333 Z M40,22.2222222 L40,17.7777778 L17.7777778,17.7777778 L17.7777778,22.2222222 L40,22.2222222 Z M26.6666667,13.3333333 L31.1111111,13.3333333 L31.1111111,8.88888889 L40,8.88888889 L40,4.44444444 L31.1111111,4.44444444 L31.1111111,0 L26.6666667,0 L26.6666667,13.3333333 Z',
    },
  ],
};

export const TuneIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);

import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 26.76',
  paths: [
    {
      d:
        'M6.36,9.06V27.13h-6V9.06Zm.38-5.57a2.85,2.85,0,0,1-.92,2.22,3.39,3.39,0,0,1-2.47.89h0A3.28,3.28,0,0,1,.91,5.71,3,3,0,0,1,0,3.49,2.94,2.94,0,0,1,.94,1.25,3.43,3.43,0,0,1,3.39.37a3.34,3.34,0,0,1,2.43.88,3.12,3.12,0,0,1,.93,2.24ZM28,16.77V27.13H22V17.47a5.2,5.2,0,0,0-.74-3A2.6,2.6,0,0,0,19,13.38,2.92,2.92,0,0,0,17,14a3.81,3.81,0,0,0-1.16,1.56,4.29,4.29,0,0,0-.2,1.48V27.13h-6c0-4.85,0-8.78,0-11.79s0-4.82,0-5.4l0-.88h6v2.63h0a7.09,7.09,0,0,1,.75-1,7.63,7.63,0,0,1,1-.95A4.78,4.78,0,0,1,19,8.93a7.23,7.23,0,0,1,2.09-.29,6.46,6.46,0,0,1,5,2.07Q28,12.78,28,16.77Z',
      transform: 'translate(0 -0.37)',
    },
  ],
};

export const LinkedinIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);

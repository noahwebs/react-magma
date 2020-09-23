import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 24 28',
  paths: [
    {
      d:
        'M22.94,5.94a3.63,3.63,0,0,1,.75,1.18A3.77,3.77,0,0,1,24,8.5v18A1.5,1.5,0,0,1,22.5,28H1.5a1.44,1.44,0,0,1-1.06-.44A1.44,1.44,0,0,1,0,26.5V1.5A1.44,1.44,0,0,1,.44.44,1.44,1.44,0,0,1,1.5,0h14a3.58,3.58,0,0,1,1.38.31,3.63,3.63,0,0,1,1.18.75ZM16,2.12V8h5.88a1.69,1.69,0,0,0-.35-.64L16.64,2.47A1.69,1.69,0,0,0,16,2.12ZM22,26V10H15.5A1.5,1.5,0,0,1,14,8.5V2H2V26Zm-8-9.27a11.34,11.34,0,0,0,1.31.88,16.18,16.18,0,0,1,1.83-.11c1.53,0,2.45.26,2.77.77a.78.78,0,0,1,0,.81s0,0,0,0l0,0v0c-.06.39-.43.59-1.11.59a6.4,6.4,0,0,1-1.8-.31,11.86,11.86,0,0,1-2-.83,27.78,27.78,0,0,0-6.12,1.3Q6.4,24,5,24a.93.93,0,0,1-.44-.11L4.2,23.7l-.09-.07a.65.65,0,0,1-.1-.57,3.54,3.54,0,0,1,.88-1.43A7.57,7.57,0,0,1,7,20.13a.22.22,0,0,1,.36.09.09.09,0,0,1,0,.06c.54-.88,1.1-1.91,1.67-3.07a24.41,24.41,0,0,0,1.63-4.1,12.7,12.7,0,0,1-.48-2.49,6.15,6.15,0,0,1,.1-2q.18-.63.66-.63h.34a.65.65,0,0,1,.55.24A1.21,1.21,0,0,1,12,9.3a.33.33,0,0,1-.06.12.44.44,0,0,1,0,.13V10a21.06,21.06,0,0,1-.22,3A7.91,7.91,0,0,0,14,16.74ZM5,23.16a7,7,0,0,0,2.14-2.47A8.59,8.59,0,0,0,5.74,22,5.2,5.2,0,0,0,5,23.16ZM11.19,8.78a4.52,4.52,0,0,0,0,2.06c0-.07,0-.3.11-.68,0,0,0-.26.11-.68a.34.34,0,0,1,.06-.12l0,0s0,0,0,0v0a.87.87,0,0,0-.21-.56,0,0,0,0,1,0,0v0ZM9.25,19.11a23.16,23.16,0,0,1,4.44-1.27l-.21-.15a2.08,2.08,0,0,1-.25-.21,8.15,8.15,0,0,1-2-2.75A19.69,19.69,0,0,1,10,17.81c-.31.59-.54,1-.7,1.3Zm10.09-.25a3.71,3.71,0,0,0-2.18-.38,5.67,5.67,0,0,0,1.93.44h.28a.09.09,0,0,0,0-.05Z',
      transform: 'translate(0 0)'
    }
  ]
};

export const FilePdfOIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
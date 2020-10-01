import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 24 28',
  paths: [
    {
      d:
        'M22.94,5.94a3.69,3.69,0,0,1,.75,1.19A3.72,3.72,0,0,1,24,8.5v18A1.5,1.5,0,0,1,22.5,28H1.5a1.4,1.4,0,0,1-1.06-.44A1.44,1.44,0,0,1,0,26.5V1.5A1.44,1.44,0,0,1,.44.44,1.44,1.44,0,0,1,1.5,0h14a3.77,3.77,0,0,1,1.38.31,3.63,3.63,0,0,1,1.18.75ZM16,2.12V8h5.88a1.69,1.69,0,0,0-.35-.64L16.64,2.47A1.69,1.69,0,0,0,16,2.12ZM22,26V10H15.5A1.5,1.5,0,0,1,14,8.5V2H2V26ZM7.5,12a.44.44,0,0,1,.33-.19.46.46,0,0,1,.37.1l.8.59a.44.44,0,0,1,.19.33.46.46,0,0,1-.1.37L6.25,17l2.84,3.8a.46.46,0,0,1,.1.37A.44.44,0,0,1,9,21.5l-.8.59a.51.51,0,0,1-.37.11A.45.45,0,0,1,7.5,22L4,17.3a.46.46,0,0,1,0-.6ZM20,16.7a.46.46,0,0,1,0,.6L16.5,22a.44.44,0,0,1-.33.19.46.46,0,0,1-.37-.1L15,21.5a.44.44,0,0,1-.19-.33.46.46,0,0,1,.1-.37L17.75,17l-2.84-3.8a.46.46,0,0,1-.1-.37A.44.44,0,0,1,15,12.5l.8-.59a.51.51,0,0,1,.37-.11.45.45,0,0,1,.33.2Zm-9.69,7.21A.46.46,0,0,1,10,23.7a.54.54,0,0,1-.08-.37l2.15-13A.46.46,0,0,1,12.3,10a.54.54,0,0,1,.37-.08l1,.15a.46.46,0,0,1,.32.21.54.54,0,0,1,.08.37l-2.15,13a.46.46,0,0,1-.21.32.54.54,0,0,1-.37.08Z',
      transform: 'translate(0 0)',
    },
  ],
};

export const FileCodeOIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);

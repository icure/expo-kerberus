import * as React from 'react';

import { ExpoKerberusViewProps } from './ExpoKerberus.types';

export default function ExpoKerberusView(props: ExpoKerberusViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}

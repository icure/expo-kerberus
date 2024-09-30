import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoKerberusViewProps } from './ExpoKerberus.types';

const NativeView: React.ComponentType<ExpoKerberusViewProps> =
  requireNativeViewManager('ExpoKerberus');

export default function ExpoKerberusView(props: ExpoKerberusViewProps) {
  return <NativeView {...props} />;
}

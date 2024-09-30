import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoKerberus.web.ts
// and on native platforms to ExpoKerberus.ts
import ExpoKerberusModule from './ExpoKerberusModule';
import ExpoKerberusView from './ExpoKerberusView';
import { ChangeEventPayload, ExpoKerberusViewProps } from './ExpoKerberus.types';

// Get the native constant value.
export const PI = ExpoKerberusModule.PI;

export function hello(): string {
  return ExpoKerberusModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoKerberusModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoKerberusModule ?? NativeModulesProxy.ExpoKerberus);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoKerberusView, ExpoKerberusViewProps, ChangeEventPayload };

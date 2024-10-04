import { EventEmitter, requireNativeModule, Subscription } from "expo-modules-core";

export type ProgressChangeEvent = {
	progress: number;
};

export type Challenge = {
	id: string
	salts: string[]
	difficultyFactor: number
}

export type Solution = {
	id: string
	nonces: string[]
}

const ExpoKerberusModule = requireNativeModule('ExpoKerberus');

const emitter = new EventEmitter(ExpoKerberusModule);

export function addProgressListener(listener: (event: ProgressChangeEvent) => void): Subscription {
	return emitter.addListener<ProgressChangeEvent>('onProgress', listener);
}

export const resolveChallenge = async (challenge: Challenge, serializedInput: string): Promise<Solution> => {
	return await ExpoKerberusModule.resolveChallenge(challenge, serializedInput);
}
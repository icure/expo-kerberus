import { Button, Settings, StyleSheet, Text, View } from "react-native";

import { addProgressListener, Challenge, resolveChallenge, Solution } from "expo-kerberus";
import { useEffect, useState } from "react";
import { uuid } from "expo-modules-core";

import * as Progress from 'react-native-progress';


export default function App() {

	const [solution, setSolution] = useState<Solution | undefined>(undefined);
	const [progress, setProgress] = useState<number>(0);

	useEffect(() => {
		const subscription = addProgressListener(({ progress }) => {
			setProgress(progress);
		});

		return () => subscription.remove();
	}, [setProgress]);

	return (
		<View style={styles.container}>
			<Text>Proof of Work</Text>
			<Text>{JSON.stringify(solution)}</Text>

			<Progress.Bar progress={progress} width={200} />

			<Button title={'Generate PoW'} onPress={async () => {
				console.log('Generating PoW')
				const pow = await resolveChallenge(
					{
						id: uuid.v4(),
						salts: Array.from({ length: 50 }, (_, i) => uuid.v4()),
						difficultyFactor: 10000
					},
					uuid.v4()
				)
				setSolution(pow)
				console.log(pow)
			} } />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

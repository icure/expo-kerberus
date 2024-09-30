import { StyleSheet, Text, View } from 'react-native';

import * as ExpoKerberus from 'expo-kerberus';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoKerberus.hello()}</Text>
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

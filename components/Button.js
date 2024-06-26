import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function Button({ label, OnPress, ContainerStyle }) {
  return (
    <View style={ContainerStyle}>
      <Pressable style={styles.button} onPress={OnPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});

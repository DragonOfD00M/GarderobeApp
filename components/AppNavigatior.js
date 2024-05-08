import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MainPage from './MainPage';
import PersonaleLogin from './PersonaleLogin';
import KundeQRScan from './KundeQRScan';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="PersonaleLogin" component={PersonaleLogin} />
        <Stack.Screen name="KundeQRScan" component={KundeQRScan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

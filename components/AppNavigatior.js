/*AppNavigator.js holder styr på hvilke sider man kan navigere til og hvordan man navigere til dem.
Stack Navigation er en metode hvor man lægger en ny side i toppen af stakken.
Det vil sige at man starter på MainPage og når man går ind på en ny side, bliver den lagt i toppen.
Man kan trykke på tilbage for at fjerne en side fra stakken.*/

// Imports for brugte metoder
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// Herunder er alle main funktionerne fra siderne
import MainPage from '../pages/MainPage'; // MainPage er startsiden
import PersonaleLogin from '../pages/PersonaleLogin'; // PersonaleLogin er der hvor man vælge garderobe
import ImportNytSetup from '../pages/ImportNytSetup'; // Denne side er der hvor man laver skriver kode til ny garderobe
import GMainPage from '../pages/GarderobeMainPage'; // Garderobens main page, når man er logget ind
import KundeQRScan from '../pages/KundeQRScan'; // Eksistere ikke endnu.


const Stack = createStackNavigator(); 

export default function AppNavigator() {
  return (// Når en ny alle sider bliver herunder tilføget til stakken
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="PersonaleLogin" component={PersonaleLogin} />
        <Stack.Screen name="KundeQRScan" component={KundeQRScan} />
        <Stack.Screen name="ImportNytSetup" component={ImportNytSetup} />
        <Stack.Screen name="GMainPage" component={GMainPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

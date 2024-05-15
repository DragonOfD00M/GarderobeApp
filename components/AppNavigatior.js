/*AppNavigator.js holder styr på hvilke sider man kan navigere til og hvordan man navigere til dem.
Stack Navigation er en metode hvor man lægger en ny side i toppen af stakken.
Det vil sige at man starter på MainPage og når man går ind på en ny side, bliver den lagt i toppen.
Man kan trykke på tilbage for at fjerne en side fra stakken.*/

// Imports for brugte metoder
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MainPage from "../pages/MainPage"; // MainPage er startsiden
import PersonaleLogin from "../pages/PersonaleLogin"; // PersonaleLogin er der hvor man vælge garderobe
import ImportNytSetup from "../pages/ImportNytSetup"; // Denne side er der hvor man laver skriver kode til ny garderobe
import GMainPage from "../pages/GarderobeMainPage"; // Garderobens main page, når man er logget ind
import KundeQRScan from "../pages/KundeQRScan";
import QRPladserJakke from "../pages/QRPladserJakke"; // QRScanner er siden til scanning af QR-koder
import QRFjernJakke from "../pages/QRFjernJakke";
import KundeMainPage from "../pages/KundeMainPage";
import JakkeTilbage from "../pages/JakkeTilbage";
import KundeAddNamePage from "../pages/KundeAddNamePage";

// Herunder er alle main funktionerne fra siderne
const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    // Når en ny alle sider bliver herunder tilføget til stakken
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="PersonaleLogin" component={PersonaleLogin} />
        <Stack.Screen name="ImportNytSetup" component={ImportNytSetup} />
        <Stack.Screen name="GMainPage" component={GMainPage} />
        <Stack.Screen name="KundeQRScan" component={KundeQRScan} />
        <Stack.Screen name="QRPladserJakke" component={QRPladserJakke} />
        <Stack.Screen name="KundeMainPage" component={KundeMainPage} />
        <Stack.Screen name="QRFjernJakke" component={QRFjernJakke} />
        <Stack.Screen name="JakkeTilbage" component={JakkeTilbage} />
        <Stack.Screen name="KundeAddNamePage" component={KundeAddNamePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import * as React from 'react';
import { Dimensions, View, StyleSheet, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { FetchProvider } from './FetchAllDataContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';

// Import your screens and components
import Dom from './screens/Dom';
import Konto from './screens/Konto';
import Energia from './screens/Energia';
import Harmonogram from './screens/Harmonogram';
import Steruj from './screens/Steruj';
import Kalendarz from './screens/Kalendarz';
import WszystkieUrzadzenia from './screens/WszystkieUrzadzenia';
import PojedynczeUrzadzenia from './screens/PojedynczeUrzadzenia';
import EnergiaZarowka from './screens/EnergiaZarowka';
import EnergiaGniazdko from './screens/EnergiaGniazdko';
import FrameImage from './components/FrameImage';
import Frame from './components/Frame';
import Frame1 from './components/Frame1';
import Frame2 from './components/Frame2';
import Frame3 from './components/Frame3';
import Frame4 from './components/Frame4';
import Frame5 from './components/Frame5';
import Frame6 from './components/Frame6';
import Pokoj from './components/Pokoj';
import DodajPokoj from './components/DodajPokoj';
import Pomieszczenie from './screens/Pomieszczenie';
import Gniazdko from './components/Gniazdko';
import Zarowka from './components/Zarowka';
import Urzadzenia from './components/Urzadzenia';
import UrzadzeniaEdit from './components/UrzadzeniaEdit';
import DodajZarowke from './components/DodajZarowke';
import DodajZarowke2 from './components/DodajZarowke2';
import DodajGniazdko from './components/DodajGniazdko';
import DodajGniazdko2 from './components/DodajGniazdko2';
import Wykres from './components/Wykres';
import LicznikEn from './components/LicznikEn';
import Logowanie from './screens/Logowanie'; // Zaimportuj ekran logowania
import Rejestracja from './screens/Rejestracja'; // Zaimportuj ekran rejestracji
import Instrukcja1 from './screens/Instrukcja1';
import Instrukcja2 from './screens/Instrukcja2';
import Instrukcja3 from './screens/Instrukcja3';
import Instrukcja4 from './screens/Instrukcja4';
import Instrukcja5 from './screens/Instrukcja5';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Utility function for scaling font size
const scaleFont = (size) => {
  const { width } = Dimensions.get('window');
  return (width / 400) * size;
};

function BottomTabsRoot() {
  const [bottomTabItemsNormal] = React.useState([
    <Frame6 />,
    <Frame3 />,
    <Frame4 />,
    <Frame5 />,
  ]);
  const [bottomTabItemsActive] = React.useState([
    <Frame2 />,
    <FrameImage />,
    <Frame />,
    <Frame1 />,
  ]);

  // Responsive tab bar style
  const tabBarStyle = {
    width: '100%', // Use 100% of the width
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribute items evenly
  };

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={({ state, descriptors, navigation }) => {
        const activeIndex = state.index;
        return (
          <View style={tabBarStyle}>
            {bottomTabItemsNormal.map((item, index) => {
              const isFocused = state.index === index;
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    navigation.navigate({
                      name: state.routes[index].name,
                      merge: true,
                    });
                  }}
                  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} // Ensure items are centered and evenly spaced
                >
                  {activeIndex === index ? bottomTabItemsActive[index] || item : item}
                </Pressable>
              );
            })}
          </View>
        );
      }}
    >
      <Tab.Screen name="Dom" component={Dom} options={{ headerShown: false }} />
      <Tab.Screen name="Harmonogram" component={Harmonogram} options={{ headerShown: false }} />
      <Tab.Screen name="Energia" component={Energia} options={{ headerShown: false }} />
      <Tab.Screen name="Konto" component={Konto} options={{ headerShown: false }} />

    </Tab.Navigator>
  );
}

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [fontsLoaded, error] = useFonts({
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <FetchProvider>
    <NavigationContainer>
      {hideSplashScreen ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Logowanie" component={Logowanie} />
        <Stack.Screen name="Rejestracja" component={Rejestracja} />
        <Stack.Screen name="Instrukcja1" component={Instrukcja1} />
        <Stack.Screen name="Instrukcja2" component={Instrukcja2} />
        <Stack.Screen name="Instrukcja3" component={Instrukcja3} />
        <Stack.Screen name="Instrukcja4" component={Instrukcja4} />
        <Stack.Screen name="Instrukcja5" component={Instrukcja5} />
        <Stack.Screen name="BottomTabsRoot" component={BottomTabsRoot} />
        <Stack.Screen name="Steruj" component={Steruj} />
        <Stack.Screen name="Pokoj" component={Pokoj} />
        <Stack.Screen name="DodajPokoj" component={DodajPokoj} />
         <Stack.Screen name="Pomieszczenie" component={Pomieszczenie} />
         <Stack.Screen name="Gniazdko" component={Gniazdko} />
         <Stack.Screen name="Zarowka" component={Zarowka} />
         <Stack.Screen name="Urzadzenia" component={Urzadzenia} />
         <Stack.Screen name="UrzadzeniaEdit" component={UrzadzeniaEdit} />
         <Stack.Screen name="Kalendarz" component={Kalendarz} />
         <Stack.Screen name="DodajZarowke" component={DodajZarowke} />
         <Stack.Screen name="DodajZarowke2" component={DodajZarowke2} />
         <Stack.Screen name="DodajGniazdko" component={DodajGniazdko} />
         <Stack.Screen name="DodajGniazdko2" component={DodajGniazdko2} />
         <Stack.Screen name="Wykres" component={Wykres} />
         <Stack.Screen name="LicznikEn" component={LicznikEn} />
         <Stack.Screen name="WszystkieUrzadzenia" component={WszystkieUrzadzenia} />
         <Stack.Screen name="PojedynczeUrzadzenia" component={PojedynczeUrzadzenia} />
         <Stack.Screen name="EnergiaZarowka" component={EnergiaZarowka} />
         <Stack.Screen name="EnergiaGniazdko" component={EnergiaGniazdko} />
          </Stack.Navigator>
      ) : null}
    </NavigationContainer>
    </FetchProvider>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const Stack = createNativeStackNavigator();
let url = "";

const SECTIONS = [
  {
    header: 'Category',
    items: [
      { 
        color: '#fe9400', 
        label: "Dev",
        type: 'link',
        onPress: () => handleLanguagePress(1),
      },
      {
        color: '#007afe',
        label: "Celebrity",
        type: 'link',
        onPress: () => handleLanguagePress(2),
      },
      { 
        color: '#fe9400', 
        label: "Food",
        type: 'link',
        onPress: () => handleLanguagePress(3),
      },
      {
        color: '#007afe',
        label: "Political",
        type: 'link',
        onPress: () => handleLanguagePress(4),
      },
      {
        color: '#007afe',
        label: "All",
        type: 'link',
        onPress: () => handleLanguagePress(5),
      }
    ]
  }
]

const handleLanguagePress = (id) => {
  if(id == 1){
    url = "?category=dev";
    showToast('Category changed to Development');
    console.log("case1");
  }
  else if(id == 2){
    url = "?category=celebrity";
    showToast('Category changed to Celebrity');
    console.log("case2");
  }
  else if(id == 3){
    url = "?category=food";
    showToast('Category changed to Food');
    console.log("case3");
  }
  else if(id == 4){
    url = "?category=political";
    showToast('Category changed to Political');
    console.log("case4");
  }
  else if(id == 5){
    url = "";
    showToast('All categories in use');
    console.log("case5");
  }
};

const showToast = (message) => {
  Toast.show({
    text1: message,
    type: 'success',
    position: 'bottom',
  });
};

const App = () => {
  
  const [joke, setJoke] = useState('');

  useEffect(() => {
    fetchChuckNorrisJoke();
  }, []);

  const fetchChuckNorrisJoke = async () => {
    
    try {
      
      const response = await axios.get('https://api.chucknorris.io/jokes/random' + url);
      setJoke(response.data.value);
    } catch (error) {
      console.error('Error fetching Chuck Norris joke:', error.message);
    }
  };

  const HomeScreen = ({navigation}) => {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Chuck Norris Jokes</Text>
        <Text style={styles.jokeText}>{joke}</Text>
        <TouchableOpacity
        style={styles.customButton}
        onPress={fetchChuckNorrisJoke}
        >
        <Text style={styles.buttonText}>Get New Joke</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.customButtonSettings}
          onPress={() =>
            navigation.navigate('Settings')
          }
        >
        <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
    </ScrollView>
    );
  };

  const SettingsScreen = ({ navigation, route }) => {
    return (
      <View >
        {SECTIONS.map((section) => (
          <View style={styles.section} key={section.header}>
            <Text style={styles.sectionHeader}>{section.header}</Text>

            {section.items.map((item) => (
              <TouchableOpacity
                key={item.label}
                onPress = { item.onPress } >
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>{item.label}</Text>

                  <View style={{ flex: 1}} />

                  {item.type === 'toggle' && <Switch />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <TouchableOpacity
          style={styles.customButtonSettings}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgb(10,10,10)',
    //backgroundColor:'rgb(0, 205, 255)',
  },
  header: {
    fontSize: 36,
    color: 'white',
  },
  customButton: {
    backgroundColor: 'green',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  customButtonSettings: {
    backgroundColor: 'darkred',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  jokeText: {
    fontSize: 20,
    marginTop: 120,
    marginBottom: 40,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    color: 'white',
    backgroundColor: 'black',
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 30,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  rowLabel: {
    fontSize: 17,
    color: '#0c0c0c'
  },
});

export default App;

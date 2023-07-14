import React from 'react';
import { View, ScrollView } from 'react-native';
import HomeScreen from './HomeScreen';
import MenuBar from './MenuBar';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <HomeScreen />
      </ScrollView>
      <MenuBar />
    </View>
  );
};

export default App;

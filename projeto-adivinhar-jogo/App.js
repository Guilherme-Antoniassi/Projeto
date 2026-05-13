import React from 'react';
import { StatusBar } from 'react-native';

import AppNavigator from './Projeto/src/Navigation/AppNavigation';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <AppNavigator />
    </>
  );
}
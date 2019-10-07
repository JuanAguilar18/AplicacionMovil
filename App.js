import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Envio from './src/page/DatosEnvio'
import ClienteD from './src/page/DatosCliente'
import HomeScreen from './src/component/Home'
import DatosPago from './src/component/Pago'
import Pagina from './src/page/Navegacion'
import Prueba from './src/page/prueba'


const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    PagoDatos: DatosPago,
    DatosCliente: ClienteD,
    EnvioDatos: Envio,
    Navegar : Pagina,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

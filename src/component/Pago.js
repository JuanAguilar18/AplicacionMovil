import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Button, TextInput, ScrollView } from 'react-native';

import Tarjeta from './Tarjeta'

export default class Pago extends Component {

  static navigationOptions = {
    title: '       American Express',
    //Title
    //headerLeft: <ActionBarImage />,
    //Image in Navigation Bar
    headerStyle: {
      backgroundColor: '#000000',
      //Background Color of Navigation Bar
    },
    headerTitleStyle:{
      fontSize:30,
      alignSelf:'center',
    },
    headerTintColor: '#ffffff',
    //Text Color of Navigation Bar
  };


  clearText = () => {
    this.setState({
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: '',
      mail: '',
      desOrden: '',
      monto: '',
      numTarjeta: '',
      mes: '',
      ano: '',
      cds: '',
      identSession: '',
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: '',
      mail: '',
      desOrden: '',
      monto: '',
      numTarjeta: '',
      mes: '',
      ano: '',
      cds: '',
      identSession: '',
    }
  }

  siguiente = () => {
    const { nombre, apellido, mail, telefono, numTarjeta, mes, ano, cds, monto, desOrden } = this.state;
    this.props.navigation.navigate('DatosCliente', {nombreC: nombre, apC:apellido, mailC:mail, telefonoC:telefono, cantidad:monto, orden:desOrden, tarjeta:numTarjeta,mesT:mes, anoT:ano, cvv:cds})
  }

  render() {

    const { navigation } = this.props;
    const nameUser = navigation.getParam('name');
    this.nombrePrueba = nameUser;

    return (
      <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1542598953-41310c43f54b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80' }} style={{ width: '100%', height: '100%' }}>
        <View style={styles.cabecero}>
          <Text style={styles.paragranph}>Bienvenido {JSON.stringify(nameUser).replace(/['"]+/g, '')}</Text>
        </View>
        <View style={styles.container}>
          <ScrollView>
            <View>
              <TextInput
                placeholder="Nombre(s)"
                style={styles.inputNombre}
                underlineColorAndroid={'transparent'}
                placeholderTextColor="#ffffff" maxLength={35}
                onChangeText={nombre => this.setState({ nombre })}
                value={this.state.nombre} />
              <TextInput
                placeholder="Apellidos"
                style={styles.inputNombre}
                underlineColorAndroid={'transparent'}
                placeholderTextColor="#ffffff" maxLength={35}
                onChangeText={apellido => this.setState({ apellido })}
                value={this.state.apellido} />
              <TextInput
                placeholder="Telefono"
                style={styles.inputNombre}
                underlineColorAndroid={'transparent'}
                placeholderTextColor="#ffffff" maxLength={10} keyboardType='numeric'
                onChangeText={telefono => this.setState({ telefono })}
                value={this.state.telefono} />
              <TextInput
                placeholder="Correo"
                style={styles.inputNombre}
                underlineColorAndroid={'transparent'}
                placeholderTextColor="#ffffff" maxLength={50} keyboardType='email-address'
                onChangeText={mail => this.setState({ mail })}
                value={this.state.mail} />
              <TextInput
                placeholder="Descripcion de la orden"
                style={styles.inputBox}
                underlineColorAndroid={'transparent'}
                placeholderTextColor="#ffffff" maxLength={16}
                onChangeText={desOrden => this.setState({ desOrden })}
                value={this.state.desOrden} />
              <TextInput placeholder="Monto en MXN"
                style={styles.montoText}
                underlineColorAndroid={'transparent'}
                placeholderTextColor="#ffffff" keyboardType='numeric' maxLength={150}
                onChangeText={monto => this.setState({ monto })}
                value={this.state.monto} />
            </View>
            <TextInput
              placeholder="Numero de Tarjeta"
              style={styles.inputBox}
              underlineColorAndroid={'transparent'}
              placeholderTextColor="#ffffff" maxLength={16} keyboardType='numeric'
              onChangeText={numTarjeta => this.setState({ numTarjeta })}
              value={this.state.numTarjeta} />
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
              <TextInput placeholder="Mes"
                style={styles.mesAno}
                underlineColorAndroid={'transparent'}
                placeholderTextColor="#ffffff" keyboardType='numeric' maxLength={2}
                onChangeText={mes => this.setState({ mes })}
                value={this.state.mes} />
              <TextInput placeholder="Año"
                style={styles.mesAno}
                underlineColorAndroid={'transparent'}
                placeholderTextColor="#ffffff" keyboardType='numeric' maxLength={2}
                onChangeText={ano => this.setState({ ano })}
                value={this.state.ano} />
              <TextInput
                placeholder="CVV"
                style={styles.mesAno}
                underlineColorAndroid={'transparent'}
                placeholderTextColor="#ffffff" keyboardType='numeric' maxLength={4}
                onChangeText={cds => this.setState({ cds })}
                value={this.state.cds} />
            </View>
            <View>
              <Button style={styles.boton} onPress={this.siguiente} title='Siguiente' />
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    alignSelf: 'center',
    paddingLeft:10,
    paddingRight:10,
  },
  cabecero: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
  },
  textoAdmin: {
    marginTop: 10,
    marginVertical: 15,
    fontSize: 30,
    justifyContent: 'center',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  paragranph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff'
  },
  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  inputNombre: {
    width: 400,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  mesAno: {
    width: 60,
    height: 55,
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 25,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
    alignSelf: 'stretch'
  },
  montoText: {
    width: 120,
    height: 50,
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 25,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
    alignSelf: 'stretch'
  },
  boton: {
    width: 150,
    backgroundColor: '#1c313a',
    justifyContent: 'flex-end',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12
  },
});
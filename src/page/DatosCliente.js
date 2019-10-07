import React, { Component } from 'react';
import { Button, View, Text, ScrollView, ImageBackground, TextInput, StyleSheet } from 'react-native';

export default class DatosCliente extends Component {


  static navigationOptions = {
    title:' American Express',
    //Title
    //headerLeft: <ActionBarImage />,
    //Image in Navigation Bar
    headerStyle: {
      backgroundColor: '#000000',
      //Background Color of Navigation Bar
    },
    headerTitleStyle:{
      fontSize:30,
    },
    headerTintColor: '#ffffff',
    //Text Color of Navigation Bar
  };


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
      scity: '',
      scountry: '',
      sstateProvince: '',
      sstreet: '',
      sspostcodeZip: ''
    }
  }

  siguiente = () => {
    const { scity, scountry, sstateProvince, sstreet, sspostcodeZip } = this.state;
    this.props.navigation.navigate('EnvioDatos', {
      nombreC: this.nombre, apC: this.apellido, mailC:this.mail, telefonoC:this.telefono,cantidad: this.monto, orden: this.desOrden, tarjeta: this.numTarjeta, mesT: this.mes, anoT: this.ano, cvv: this.cds, cityS: scity, countryS: scountry, stateProvinceS: sstateProvince, streetS: sstreet, spostcodeZipS: sspostcodeZip
    })
  }

  ALERTAS = () => {
    alert(this.apellido + '----' + this.nombre);
  }

  render() {

    const { navigation } = this.props;
    const nombreUrl = navigation.getParam('nombreC');
    this.nombre = nombreUrl;
    const apUrl = navigation.getParam('apC');
    this.apellido = apUrl;
    const emailURL = navigation.getParam('mailC');
    this.mail = emailURL;
    const telefonoURL = navigation.getParam('telefonoC');
    this.telefono = telefonoURL;
    const cantidadURl = navigation.getParam('cantidad');
    this.monto = cantidadURl;
    const ordenUrl = navigation.getParam('orden');
    this.desOrden = ordenUrl;
    const tarjetaUrl = navigation.getParam('tarjeta');
    this.numTarjeta = tarjetaUrl;
    const mesUrl = navigation.getParam('mesT');
    this.mes = mesUrl;
    const anoUrl = navigation.getParam('anoT');
    this.ano = anoUrl;
    const cvvUrl = navigation.getParam('cvv');
    this.cds = cvvUrl;


    return (
      <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1542598953-41310c43f54b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80' }} style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.cabecero}>
              <Text style={styles.paragranph}>Datos de dirección del cliente {JSON.stringify(nombreUrl).replace(/['"]+/g, '')}</Text>
            </View>
            <View style={{paddingLeft:50}}>
              <TextInput
                placeholder="Ciudad"
                style={styles.inputBox}
                underlineColorAndroid={'transparent'}
                placeholderTextColor="#ffffff" maxLength={16}
                onChangeText={scity => this.setState({ scity })}
                value={this.state.scity} />
              <TextInput
                placeholder="Pais"
                style={styles.inputBox}
                underlineColorAndroid={'transparent'}
                placeholderTextColor="#ffffff" maxLength={3}
                onChangeText={scountry => this.setState({ scountry })}
                value={this.state.scountry} />
              <TextInput
                placeholder="Estado"
                style={styles.inputBox}
                underlineColorAndroid={'transparent'}
                placeholderTextColor="#ffffff" maxLength={16}
                onChangeText={sstateProvince => this.setState({ sstateProvince })}
                value={this.state.sstateProvince} />
              <TextInput
                placeholder="Calle"
                style={styles.inputBox}
                underlineColorAndroid={'transparent'}
                placeholderTextColor="#ffffff" maxLength={25}
                onChangeText={sstreet => this.setState({ sstreet })}
                value={this.state.sstreet} />
              <TextInput
                placeholder="CP"
                style={styles.inputBox}
                underlineColorAndroid={'transparent'}
                placeholderTextColor="#ffffff" maxLength={5} keyboardType='numeric'
                onChangeText={sspostcodeZip => this.setState({ sspostcodeZip })}
                value={this.state.sspostcodeZip} />
            </View>
            <View style={{flex: 1,justifyContent: 'flex-end',marginTop: 85}}>
              <Button onPress={this.siguiente} title='Siguiente' />
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
  },
  cabecero: {
    justifyContent: 'center',
    margin: 24,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff'
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
  boton2: {
    width: 150,
    backgroundColor: '#1c313a',
    justifyContent: 'flex-end',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
    flex: 1,
    marginBottom: 36
  },
});
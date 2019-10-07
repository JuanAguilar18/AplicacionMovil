import React, { Component } from 'react';
import { Button, View, Text, ScrollView, ImageBackground, TextInput, StyleSheet, Alert } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Pago from '../component/Pago';

export default class DatosEnvio extends Component {


  static navigationOptions = {
    title: '          American Express',
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
      sspostcodeZip: '',
      bcity: '',
      bcountry: '',
      bstateProvince: '',
      bstreet: '',
      bpostcodeZip: '',
      identSession: ''
    }
  }

  showAlert() {
    Alert.alert(
      'Advertencia',
      'Revisar la información que se está ingresando',
      [
        { text: 'OK' },
      ],
      { cancelable: false },
    );
  }

  errorDeConexcion() {
    Alert.alert(
      'Advertencia',
      'El servicio de operaciones tiene un problema favor de esperar',
      [
        { text: 'OK' },
      ],
      { cancelable: false },
    );
  }

  servicioRest = () => {
    const { nombre, apellido, numTarjeta, mes, ano, cds, monto, desOrden, scity, scountry, sstateProvince, sstreet, sspostcodeZip, bcity, bcountry, bstateProvince, bstreet, bpostcodeZip } = this.state;
    const data = { usuario: 'usuario', pass: 12345 };
    const min = 400;
    const max = 1000;
    const rand = min + Math.random() * (max - min);
    this.setState({ random: this.state.random + Math.trunc(rand) });

    //  alert('Nombre: '+nombre+' \nApellido: '+apellido+' \nNumero de Tarjeta: '+numTarjeta+' \nMes: '+mes+' \nAño: '+ano+' \nCVV: '+cds+'\n Monto: '+monto);

    if (this.nombre != '' && this.apellido != '' && this.numTarjeta != '' && this.ano != ''
      && this.mes != '' && this.cds != '' && this.monto != '') {
      fetch(`http://192.168.0.18:5050/obtenerSesionApi?usr=${encodeURIComponent(data.usuario)}&pwd=${encodeURIComponent(data.pass)}`, {
        method: "GET"
      })
        .then((response) => response.json())
        .then((resultSession) => {

          identSession = resultSession.idSesion;

          if (resultSession.idSesion != '') {
            //Session
            //fetch(`http://192.168.0.22:5050/actualizarSesionApi?idSesion=${encodeURIComponent(identSession)}&monto=${encodeURIComponent(monto)}&numeroTarjeta=${encodeURIComponent(numTarjeta)}&anio=${encodeURIComponent(ano)}&mes=${encodeURIComponent(mes)}&code=${encodeURIComponent(cds)}&desc=${encodeURIComponent(desOrden)}`, {
            fetch(`http://192.168.0.18:5050/actualizarSesionApi?idSesion=${encodeURIComponent(identSession)}&monto=${encodeURIComponent(this.monto)}&numeroTarjeta=${encodeURIComponent(this.numTarjeta)}&anio=${encodeURIComponent(this.ano)}&mes=${encodeURIComponent(this.mes)}&code=${encodeURIComponent(this.cds)}&desc=${encodeURIComponent(this.desOrden)}&scity=${encodeURIComponent(this.scity)}&scountry=${encodeURIComponent(this.scountry)}&sstateProvince=${encodeURIComponent(this.sstateProvince)}&sstreet=${encodeURIComponent(this.sstreet)}&sspostcodeZip=${encodeURIComponent(this.sspostcodeZip)}&bcity=${encodeURIComponent(bcity)}&bcountry=${encodeURIComponent(bcountry)}&bstateProvince=${encodeURIComponent(bstateProvince)}&bstreet=${encodeURIComponent(bstreet)}&bpostcodeZip=${encodeURIComponent(bpostcodeZip)}&email=${encodeURIComponent(this.mail)}&phone=${encodeURIComponent(this.telefono)}`, {
              method: "GET"
            })
              .then((response) => response.json())
              .then((resTransaction) => {
                if (resTransaction.result == 'SUCCESS') {
                  //Operacion de transaccion              
                  var pedido = 'MILUCHITA-' + this.state.random;

                  //fetch(`http://192.168.0.22:5050/realizarPago?idSesion=${encodeURIComponent(resTransaction.idSesion)}&idPedido=${encodeURIComponent(pedido)}`, {
                  fetch(`http://192.168.0.18:5050/realizar3dsEnrollment?idSesion=${encodeURIComponent(resTransaction.idSesion)}&monto=${encodeURIComponent(this.monto)}`, {
                    method: "GET"
                  })
                    .then((response) => response.text())
                    .then((urlVal) => {
                      this.props.navigation.navigate('Navegar', {
                        url: urlVal,
                      });
                    })
                    .catch((error) => {
                      console.error(error);
                    });

                } else {
                  this.errorDeConexcion();
                }
              })
              .catch((error) => {
                console.warn(error);
              });

          } else {
            this.errorDeConexcion;
          }
        })
        .catch((error) => {
          console.warn(error);
        });
    } else {
      //alert('Por favor ayudanos con la información');
      this.showAlert();
    }
  }

  /*ALERTAS = () => {
     alert(this.apellido + '----' + this.nombre + '\n' + this.monto + '\n' + this.desOrden + '\n' + this.numTarjeta + '\n' + this.mes + '\n' + this.ano + '\n' + this.cds + '\n' + this.scity + '\n' + this.scountry + '\n' + this.sstateProvince + '\n' + this.sstreet + '\n' + this.sspostcodeZip);
   }*/

  paginaInicio = () => {
    this.props.navigation.navigate('PagoDatos');
    Pago.clearText;
  }

  render() {

    const { navigation } = this.props;
    const nombreUrl = navigation.getParam('nombreC');
    this.nombre = nombreUrl;
    const apUrl = navigation.getParam('apC');
    this.apellido = apUrl;
    const mailURL = navigation.getParam('mailC');
    this.mail = mailURL;
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
    const scityUrl = navigation.getParam('cityS');
    this.scity = scityUrl;
    const scountryUrl = navigation.getParam('countryS');
    this.scountry = scountryUrl;
    const sstateProvinceUrl = navigation.getParam('stateProvinceS');
    this.sstateProvince = sstateProvinceUrl;
    const sstreetUrl = navigation.getParam('streetS');
    this.sstreet = sstreetUrl;
    const sspostcodeZipUrl = navigation.getParam('spostcodeZipS');
    this.sspostcodeZip = sspostcodeZipUrl;


    return (
      <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1542598953-41310c43f54b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80' }} style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.cabecero}>
              <Text style={styles.paragranph}>Datos de facturacion del cliente {JSON.stringify(nombreUrl).replace(/['"]+/g, '')}</Text>
            </View>
            <View style={{paddingLeft:50}}>
              <TextInput
                placeholder="Ciudad"
                style={styles.inputBox}
                underlineColorAndroid={'transparent'}
                placeholderTextColor="#ffffff" maxLength={16}
                onChangeText={bcity => this.setState({ bcity })}
                value={this.state.bcity} />
              <TextInput
                placeholder="Pais"
                style={styles.inputBox}
                underlineColorAndroid={'transparent'}
                placeholderTextColor="#ffffff" maxLength={3}
                onChangeText={bcountry => this.setState({ bcountry })}
                value={this.state.bcountry} />
              <TextInput
                placeholder="Estado"
                style={styles.inputBox}
                underlineColorAndroid={'transparent'}
                placeholderTextColor="#ffffff" maxLength={16}
                onChangeText={bstateProvince => this.setState({ bstateProvince })}
                value={this.state.bstateProvince} />
              <TextInput
                placeholder="Calle"
                style={styles.inputBox}
                underlineColorAndroid={'transparent'}
                placeholderTextColor="#ffffff" maxLength={25}
                onChangeText={bstreet => this.setState({ bstreet })}
                value={this.state.bstreet} />
              <TextInput
                placeholder="CP"
                style={styles.inputBox}
                underlineColorAndroid={'transparent'}
                placeholderTextColor="#ffffff" maxLength={5} keyboardType='numeric'
                onChangeText={bpostcodeZip => this.setState({ bpostcodeZip })}
                value={this.state.bpostcodeZip} />
            </View>
            <View style={styles.containerBotones}>
              <View style={styles.buttonContainer}>
                <Button color="#cc0605" title="Nueva Operacion" onPress={this.paginaInicio}/>
              </View>
              <View style={styles.buttonContainer}>
                <Button color="#00913f" title="Enviar" onPress={this.servicioRest}/>
              </View>
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
  boton: {
    width: 150,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
    flex: 1,
    marginBottom: 36
  },
  containerBotones: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 82
  },
  buttonContainer: {
    flex: 1
  }  
});
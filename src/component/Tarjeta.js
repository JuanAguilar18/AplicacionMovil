import React, { Component } from 'react';
import { View, Button, StyleSheet, ScrollView, TextInput, Alert, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';


export default class Tarjeta extends Component {

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
      random: 0,
      scity: '',
      scountry: '',
      sstateProvince: '',
      sstreet: '',
      sspostcodeZip: '',
      bcity: '',
      bcountry: '',
      bstateProvince: '',
      bstreet: '',
      bpostcodeZip: ''
    }
  }

  siguiente = () => {

    var nombreC = 'Carol'
    this.props.navigation.navigate('Captura',{name:nombreC})
  }

  clearText() {
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
      random: 0,
      scity: '',
      scountry: '',
      sstateProvince: '',
      sstreet: '',
      sspostcodeZip: '',
      bcity: '',
      bcountry: '',
      bstateProvince: '',
      bstreet: '',
      bpostcodeZip: ''
    })
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

  servicioRest = () => {
    const { nombre, apellido, numTarjeta, mes, ano, cds, monto, desOrden, scity, scountry, sstateProvince, sstreet, sspostcodeZip, bcity, bcountry, bstateProvince, bstreet, bpostcodeZip } = this.state;
    const data = { usuario: 'usuario', pass: 12345 };
    const min = 400;
    const max = 1000;
    const rand = min + Math.random() * (max - min);
    this.setState({ random: this.state.random + Math.trunc(rand) });

    //  alert('Nombre: '+nombre+' \nApellido: '+apellido+' \nNumero de Tarjeta: '+numTarjeta+' \nMes: '+mes+' \nAño: '+ano+' \nCVV: '+cds+'\n Monto: '+monto);

    if (nombre != '' && apellido != '' && numTarjeta != '' && ano != ''
      && mes != '' && cds != '' && monto != '') {
      fetch(`http://192.168.0.22:5050/obtenerSesionApi?usr=${encodeURIComponent(data.usuario)}&pwd=${encodeURIComponent(data.pass)}`, {
        method: "GET"
      })
        .then((response) => response.json())
        .then((resultSession) => {

          identSession = resultSession.idSesion;

          if (resultSession.idSesion != '') {
            //Session
            //fetch(`http://192.168.0.22:5050/actualizarSesionApi?idSesion=${encodeURIComponent(identSession)}&monto=${encodeURIComponent(monto)}&numeroTarjeta=${encodeURIComponent(numTarjeta)}&anio=${encodeURIComponent(ano)}&mes=${encodeURIComponent(mes)}&code=${encodeURIComponent(cds)}&desc=${encodeURIComponent(desOrden)}`, {
            fetch(`http://192.168.0.22:5050/actualizarSesionApi?idSesion=${encodeURIComponent(identSession)}&monto=${encodeURIComponent(monto)}&numeroTarjeta=${encodeURIComponent(numTarjeta)}&anio=${encodeURIComponent(ano)}&mes=${encodeURIComponent(mes)}&code=${encodeURIComponent(cds)}&desc=${encodeURIComponent(desOrden)}&scity=${encodeURIComponent(scity)}&scountry=${encodeURIComponent(scountry)}&sstateProvince=${encodeURIComponent(sstateProvince)}&sstreet=${encodeURIComponent(sstreet)}&sspostcodeZip=${encodeURIComponent(sspostcodeZip)}&bcity=${encodeURIComponent(bcity)}&bcountry=${encodeURIComponent(bcountry)}&bstateProvince=${encodeURIComponent(bstateProvince)}&bstreet=${encodeURIComponent(bstreet)}&bpostcodeZip=${encodeURIComponent(bpostcodeZip)}`, {
              method: "GET"
            })
              .then((response) => response.json())
              .then((resTransaction) => {
                if (resTransaction.result == 'SUCCESS') {
                  //Operacion de transaccion              
                  var pedido = 'MILUCHITA-' + this.state.random;

                  //fetch(`http://192.168.0.22:5050/realizarPago?idSesion=${encodeURIComponent(resTransaction.idSesion)}&idPedido=${encodeURIComponent(pedido)}`, {
                  fetch(`http://192.168.0.22:5050/realizar3dsEnrollment?idSesion=${encodeURIComponent(resTransaction.idSesion)}&monto=${encodeURIComponent(monto)}&idPedido=${encodeURIComponent(pedido)}`, {
                    method: "GET"
                  })
                    .then((response) => response.text())
                    .then((urlVal) => {
                      alert(urlVal);
                      this.props.navigation.navigate('Details', {
                        name: userName,
                      });
                      //var respuesta = responseJson.result.substr(0,2);
                      /* if(respuesta == 'OK'){
                         alert('Su transacción a sido procesada con el foliio: ' + pedido);
                         this.clearText();
                       }*/
                    })
                    .catch((error) => {
                      console.error(error);
                    });

                } else {
                  alert('El servicio de operaciones tiene un problema favor de esperar');
                }
              })
              .catch((error) => {
                console.warn(error);
              });

          } else {
            alert('Espere un momento tenemos problemas con el servico');
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

  render() {
    return (
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
              placeholder="Calle y Numero"
              style={styles.inputNombre}
              underlineColorAndroid={'transparent'}
              placeholderTextColor="#ffffff" maxLength={35}
              onChangeText={direccion => this.setState({ direccion })}
              value={this.state.direccion} />
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
              placeholderTextColor="#ffffff" maxLength={30} keyboardType='email-address'
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
              style={styles.codigoDeSeguridad}
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
            <Button style={styles.boton} onPress={this.siguiente} title='Enviar' />
          </View>
        </ScrollView>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1
  },
  cabecero: {
    justifyContent: 'center',
    margin: 24,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff'
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
  codigoDeSeguridad: {
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
import React, { Component } from 'react';
import { View, Text, TextInput, Button, ImageBackground, Alert ,StyleSheet} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'; 

import Logo from '../component/Logo';

export default class HomeScreen extends Component {

    
  static navigationOptions = {
    //
    title: '               BIENVENIDO',
    //Title
    //headerLeft: <ActionBarImage />,
    //Image in Navigation Bar
    headerStyle: {
      backgroundColor: '#0071bc',
      //Background Color of Navigation Bar
    },
    headerTitleStyle:{
      fontSize:31,
      alignSelf:'center',
    },
    headerTintColor: '#ffffff',
    //Text Color of Navigation Bar
  };

    
    constructor(props){
        super(props)
        this.state={
            userName:'',
            userPassword:''
        }
    }
    
    login = () => {

        const{userName, userPassword} = this.state;

        if (userName == null || userName == '') {
            var mensaje = 'Estas mal';
            //this.props.navigation.navigate('Captura',{url:mensaje});

            alert('Validar usuario');
        }else if (userPassword == null || userPassword == '') {
            alert('Validar password');
        }

        if (userName == 'admin' && userPassword == 'admin1') {

            this.props.navigation.navigate('PagoDatos', {
                name: userName,
              });
            /*this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'Details'})
                ],
            }))**/
        }else{
            this._showAlert();
        }
    }
    
    _showAlert() {
        Alert.alert(
            'Advertencia',
            'Favor de revisar tus credenciales',
            [
              {text: 'OK'},
            ],
            {cancelable: false},
          );
      }

    render() {
        return (
            <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1556741533-2c7e140cd038?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80' }} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <Logo/>
                    <TextInput style={styles.inputBox}
                        underlineColorAndroid={'transparent'}
                        placeholder="Usuario"
                        placeholderTextColor="#ffffff"
                        onChangeText={userName => this.setState({ userName })} />
                    <TextInput style={styles.inputBox}
                        underlineColorAndroid={'transparent'}
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor="#ffffff"
                        onChangeText={userPassword => this.setState({ userPassword })} />
                    <Button onPress={this.login} style={styles.botonLogin} title="Login" />
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingLeft:40,
        paddingRight:40,
    },
    header:{
        fontSize:24,
        marginBottom:60,
        color:'#ffffff',
        fontWeight:'bold',
    },
    inputBox:{
        width:300,
        backgroundColor:'rgba(255,255,255,0.3)',
        borderRadius: 25,
        paddingHorizontal : 16,
        fontSize:16,
        color:'#ffffff',
        marginVertical:10,
        alignSelf:'stretch'
    },

});

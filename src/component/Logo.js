import React, { Component } from 'react';
import {Text, View, Image,StyleSheet } from 'react-native';

export default class Logo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{ width: 118, height: 117 }}
                    source={require('../imagenes/logo_amex.png')}
                />
                <Text style={styles.TextoLogin}>Bienvenidos a American Express</Text>
            </View>
        );
    }
}



const styles = StyleSheet.create({

    container:{
      justifyContent:'center',
      alignItems:'center'
    },
    TextoLogin:{
        marginVertical:15,
        fontSize:18,
        justifyContent:'center',
        color:'rgba(255, 255, 255, 0.7)'
    },
  });

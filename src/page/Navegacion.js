import React, {Component} from 'react';
import { WebView } from 'react-native-webview';

export default class Navegacion extends Component {

    constructor(props) {
        super(props)
        this.state = {
          Tresds: ''
        }
    }  

  render() {
    const { navigation } = this.props;
    const url3DS = navigation.getParam('url');
    this.Tresds = url3DS;
    return (    
      <WebView
        originWhitelist={['*']}
        source={{html: this.Tresds}}
      />
    );
  }
}
import React, {Component} from 'react';
import { WebView } from 'react-native-webview';

export default class prueba extends Component { 

    render() {
      const valores = "<html> <head> <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.6.3/css/all.css' integrity='sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/' crossorigin='anonymous'> <style> html {background: url('https://images.unsplash.com/photo-1542598953-41310c43f54b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80') no-repeat center center fixed; background-size: cover; -moz-background-size: cover; -webkit-background-size: cover; -o-background-size: cover; } .icono {font-size: 60px; color: green; margin-left: 40%; } .iconoAmex{font-size: 50px; color: white; margin-left: 40%; } </style> <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.7.0/css/all.css' integrity='sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ' crossorigin='anonymous'> </head> <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script> <script src='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'></script> <script type='text/javascript'> $(document).ready(function() {setTimeout(function() {window.location.href = 'C://Users/xeego/practica/Amex7/src/component/Pago.js'; },3000); }); </script> <body> <br/> <p class='iconoAmex'><i class='fab fa-cc-amex fa-4x'></i></p> <p style='font-size:100px; color:white; text-align: justify-all;'>LA TRANSACCION SE GENERO DE MANERA CORRECTA</p> <p style='font-size:70px; color:white; text-align: center;'>Se enviara su ticket al correo que menciono</p> <p class='icono'><i class='fas fa-check-circle fa-3x'></i></p> </body> </html>";
        return (    
          <WebView
            originWhitelist={['*']}
            source={{html: valores}}
          />
        );
      }
    }
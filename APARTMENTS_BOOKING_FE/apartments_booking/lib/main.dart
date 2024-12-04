import 'package:flutter/material.dart';
import 'pages/register_page.dart';
import 'pages/login_page.dart';
import 'pages/home_page.dart';
import 'pages/verifyMail_page.dart';
import 'pages/emailVerified_page.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Apartments Booking',
      theme: ThemeData(
        brightness: Brightness.dark,
        primarySwatch: Colors.orange,
        scaffoldBackgroundColor: Colors.black,
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.orange, // Colore pulsanti
            foregroundColor: Colors.black, // Testo dei pulsanti
          ),
        ),
      ),

      
      initialRoute: '/login',
      routes: {
        '/login': (context) => LoginPage(),
        '/register': (context) => RegisterPage(),
        '/home': (context) => HomePage(),
        '/verifyMail': (context) => CheckEmailPage(),
        '/emailVerified':(context) => EmailVerifiedPage()
        // Definisci altre rotte qui
      },
    );
  }
}
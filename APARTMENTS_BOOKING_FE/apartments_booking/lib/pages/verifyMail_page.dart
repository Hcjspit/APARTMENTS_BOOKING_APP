import 'package:flutter/material.dart';

class CheckEmailPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Controlla la tua Email'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.email,
              size: 100,
              color: Colors.blue,
            ),
            SizedBox(height: 20),
            Text(
              'Abbiamo inviato un link di verifica al tuo indirizzo email.',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 18),
            ),
            SizedBox(height: 20),
            Text(
              'Per favore, controlla la tua posta elettronica per completare la registrazione.',
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
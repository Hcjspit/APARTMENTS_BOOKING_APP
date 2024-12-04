import 'package:flutter/material.dart';

class EmailVerifiedPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Email Verificata'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.check_circle,
              size: 100,
              color: Colors.green,
            ),
            SizedBox(height: 20),
            Text(
              'La tua email è stata verificata con successo!',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 18),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Naviga alla pagina di login
                Navigator.pushNamed(context, '/login');
              },
              child: Text('Vai al Login'),
            ),
          ],
        ),
      ),
    );
  }
}
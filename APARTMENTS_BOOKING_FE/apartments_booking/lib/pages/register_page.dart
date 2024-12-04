import 'package:flutter/material.dart';
import '../services/auth_service.dart';

class RegisterPage extends StatefulWidget {
  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController= TextEditingController();
  final _nomeController = TextEditingController();
  final _cognomeController = TextEditingController();
  String? _selectedState;
  final  _selectedImageController = TextEditingController();
  final AuthService _authService = AuthService();

  final List<String> _states = ['IT', 'US', 'FR', 'ES', 'DE','EN'];

  void _register() async {
    final username = _usernameController.text;
    final password = _passwordController.text;
    final confirmPassword = _confirmPasswordController.text;
    final nome = _nomeController.text;
    final cognome = _cognomeController.text;
    final stato = _selectedState;
    final immagine = _selectedImageController.text;

    if (username.isEmpty ||
        confirmPassword.isEmpty ||
        password.isEmpty ||
        nome.isEmpty ||
        cognome.isEmpty ||
        stato == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Compila tutti i campi!')),
      );
      return;
    }

    if(password != confirmPassword){
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Le password non corrispondono!')),
      );
      return;
    }

    final response = await _authService.registerUser(
      username: username,
      password: password,
      confirmPassword: confirmPassword,
      nome: nome,
      cognome: cognome,
      stato: stato,
      immagine: immagine
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Registrazione avvenuta con successo!')),
      );
      Navigator.pushReplacementNamed(context, '/verifyMail');
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Errore nella registrazione.')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'Create Account',
                  style: TextStyle(
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                    color: Colors.orange,
                  ),
                ),
                SizedBox(height: 40),
                TextField(
                  controller: _usernameController,
                  style: TextStyle(color: Colors.white),
                  decoration: InputDecoration(
                    labelText: 'Email o Username',
                    labelStyle: TextStyle(color: Colors.orange),
                    enabledBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.orange),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.orange),
                    ),
                  ),
                ),
                SizedBox(height: 20),
                TextField(
                  controller: _passwordController,
                  style: TextStyle(color: Colors.white),
                  obscureText: true,
                  decoration: InputDecoration(
                    labelText: 'Password',
                    labelStyle: TextStyle(color: Colors.orange),
                    enabledBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.orange),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.orange),
                    ),
                  ),
                ),
                SizedBox(height: 20),
                TextField(
                  controller: _confirmPasswordController,
                  style: TextStyle(color: Colors.white),
                  obscureText: true,
                  decoration: InputDecoration(
                    labelText: 'Confirm Password',
                    labelStyle: TextStyle(color: Colors.orange),
                    enabledBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.orange),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.orange),
                    ),
                  ),
                ),
                SizedBox(height: 20),
                TextField(
                  controller: _nomeController,
                  style: TextStyle(color: Colors.white),
                  decoration: InputDecoration(
                    labelText: 'Nome',
                    labelStyle: TextStyle(color: Colors.orange),
                    enabledBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.orange),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.orange),
                    ),
                  ),
                ),
                SizedBox(height: 20),
                TextField(
                  controller: _cognomeController,
                  style: TextStyle(color: Colors.white),
                  decoration: InputDecoration(
                    labelText: 'Cognome',
                    labelStyle: TextStyle(color: Colors.orange),
                    enabledBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.orange),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.orange),
                    ),
                  ),
                ),
                SizedBox(height: 20),
                TextField(
                  controller: _selectedImageController,
                  style: TextStyle(color: Colors.white),
                  decoration: InputDecoration(
                    labelText: 'Url Immagine Profilo',
                    labelStyle: TextStyle(color: Colors.orange),
                    enabledBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.orange),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.orange),
                    ),
                  ),
                ),
                SizedBox(height: 20),
                DropdownButtonFormField<String>(
                  value: _selectedState,
                  items: _states.map((state) {
                    return DropdownMenuItem(
                      value: state,
                      child: Text(state, style: TextStyle(color: Colors.orange)),
                    );
                  }).toList(),
                  onChanged: (value) {
                    setState(() {
                      _selectedState = value;
                    });
                  },
                  decoration: InputDecoration(
                    labelText: 'Stato',
                    labelStyle: TextStyle(color: Colors.orange),
                    enabledBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.orange),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.orange),
                    ),
                  ),
                ),
                SizedBox(height: 20),
                ElevatedButton(
                  onPressed: _register,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.orange,
                    foregroundColor: Colors.black,
                    minimumSize: Size(double.infinity, 50),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(30),
                    ),
                  ),
                  child: Text('Sign Up', style: TextStyle(fontSize: 18)),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

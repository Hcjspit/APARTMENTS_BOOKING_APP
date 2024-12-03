import 'dart:convert';
import 'package:http/http.dart' as http;

class AuthService {
  final String baseUrl = "http://localhost:5030/api/Utenti";

  Future<http.Response> registerUser({
    required String email,
    required String password,
    required String cognome,
    required String nome,
    required String stato,
  }) async {
    final url = Uri.parse('$baseUrl/register');
    final response = await http.post(
      url,
      headers: {"Content-Type": "application/json"},
      body: json.encode({
        "email": email,
        "password": password,
        "cognome": cognome,
        "nome": nome,
        "stato": stato,
      }),
    );
    return response;
  }

  Future<http.Response> loginUser(String username, String password) async {
    final url = Uri.parse('$baseUrl/login');
    final response = await http.post(
      url,
      headers: {"Content-Type": "application/json"},
      body: json.encode({"Email": username, "Password": password}),
    );
    return response;
  }
}
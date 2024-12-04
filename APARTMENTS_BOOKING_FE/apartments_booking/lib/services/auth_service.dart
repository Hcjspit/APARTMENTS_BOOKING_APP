import 'dart:convert';
import 'package:http/http.dart' as http;

class AuthService {
  final String baseUrlUser = "http://localhost:3000/api/user";
  final String baseUrlAuth ="http://localhost:3000/api/auth";

  Future<http.Response> registerUser({
    required String username,
    required String password,
    required String confirmPassword,
    required String cognome,
    required String nome,
    required String stato,
    required String immagine
  }) async {
    final url = Uri.parse('$baseUrlUser/register');
    final response = await http.post(
      url,
      headers: {"Content-Type": "application/json"},
      body: json.encode({
        "username": username,
        "password": password,
        "confirmPassword": confirmPassword,
        "firstName": nome,
        "lastName": cognome,
        "residence": stato,
        "profileImage": immagine
      }),
    );
    return response;
  }

  Future<http.Response> loginUser(String username, String password) async {
    final url = Uri.parse('$baseUrlAuth/login');
    final response = await http.post(
      url,
      headers: {"Content-Type": "application/json"},
      body: json.encode({"username": username, "password": password}),
    );
    return response;
  }
}
import nodemailer from "nodemailer";
import path from "path";
import * as jwt from "jsonwebtoken";
import { getEnvVariable } from "../../utils/db/envControl";
import { userSchema } from "../models/user.model";

export class EmailService {
  async sendConfirmationEmail(email: string, userId: string): Promise<any> {
    const emailSecret = getEnvVariable("EMAIL_SECRET");
    const emailUser = getEnvVariable("EMAIL_USER");
    const emailPassword = getEnvVariable("EMAIL_PW");

    const token = jwt.sign({ userId }, emailSecret, { expiresIn: "1h" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    const mailOptions = {
      from: emailUser,
      to: email,
      subject: "Email Confirmation",
      attachments: [
        {
          filename: "", // Puoi cambiare il nome del file
          path: "since2024.png", // Usa il percorso giusto per il tuo file
          cid: "logo", // Riferimento CID per usare l'immagine nell'HTML
        },
      ],
      html: `<!DOCTYPE html>
        <html lang="it">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Conferma la tua email</title>
            <style>
              body {
                font-family: 'Inter', sans-serif;
                background-color: #1f1f1f;
                color: #d1d5db;
                margin: 0;
                padding: 0;
              }
        
              .email-container {
                max-width: 600px;
                margin: 40px auto;
                background-color: #2d2d2d;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
                text-align: center;
              }
        
              h1 {
                font-size: 24px;
                color: #f9fafb;
                margin-bottom: 20px;
              }
        
              p {
                font-size: 16px;
                line-height: 1.5;
                color: #9ca3af;
                margin: 20px 0;
              }
        
              .btn-confirm {
                display: inline-block;
                padding: 10px 20px;
                font-size: 18px;
                color: #f9fafb;
                background-color: #4b5563;
                text-decoration: none;
                border-radius: 6px;
                font-weight: bold;
                transition: background-color 0.3s ease;
              }
        
              .btn-confirm:hover {
                background-color: #374151;
              }
        
              .footer {
                text-align: center;
                font-size: 14px;
                color: #9ca3af;
                margin-top: 20px;
              }
        
              .logo {
                margin-bottom: 20px;
              }
        
              .logo img {
                max-width: 150px;
                height: auto;
                border-radius: 20%;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="logo">
                <img src="cid:logo" alt="Logo" />
              </div>
        
              <h1>Conferma la tua email</h1>
        
              <p>Ciao,</p>
        
              <p>
                Grazie per esserti registrato al nostro servizio. Per completare la tua
                registrazione e attivare il tuo account, ti preghiamo di confermare il
                tuo indirizzo email cliccando sul pulsante qui sotto.
              </p>
        
              <a href="http://localhost:4200/email-confirmed?token=${token}" class="btn-confirm">
                Completa Registrazione
              </a>
        
              <p>Se non hai richiesto questo account, puoi ignorare questa email.</p>
        
              <div class="footer">
                <p>Grazie,<br />Il Team di ApartmentsBooking</p>
              </div>
            </div>
          </body>
        </html>`,
    };

    await transporter.sendMail(mailOptions);
  }
}

export default new EmailService();

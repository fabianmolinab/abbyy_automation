import { Resend } from "resend";

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const resend: Resend = new Resend(process.env.APIKEY);

export async function sendLicenseEmail(licenseNumber: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.EMAIL_TO!,
      subject: "Numero de licencias de ABBYY!",
      html: `<h1>El número de licencias es: ${licenseNumber}</h1>`,
    });

    if (error) {
      console.error("Error al enviar el correo:", error);
    } else {
      console.log("Correo enviado exitosamente:", data);
    }
  } catch (err) {
    console.error("Error interno al enviar el correo:", err);
  }
}

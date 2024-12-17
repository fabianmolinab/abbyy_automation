import { Resend } from "resend";
import express, { Request, Response } from "express";

const resend: Resend = new Resend(process.env.APIKEY!);

export function serverLicense(licenseNumber: string | null) {
  const app = express();
  console.log("Resend console " + resend);
  if (licenseNumber === null) {
    licenseNumber = "No disponible";
  }

  app.get("/", async (req: Request, res: Response) : Promise<void> => {
    try {
      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: process.env.EMAIL_TO!,
        subject: "Hello World",
        html: `<h1>El número de licencias es: ${licenseNumber}</h1>`,
      });

      if (error) {
        res.status(400).json({ error });
        return; // Finaliza la función
      }

      res.status(200).json({ data });
    } catch (err) {
      res.status(500).send("Error interno del servidor");
    }
  })
};

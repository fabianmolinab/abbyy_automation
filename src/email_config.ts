import { Resend } from "resend";
import express, { Request, Response } from "express";

const resend: Resend = new Resend(process.env.APIKEY!);

export function serverLicense(licenseNumber: string | null) {
  const app = express();
  console.log("Resend console " + resend);
  if (licenseNumber === null) {
    licenseNumber = "No disponible";
  }

  app.get("/", async (req: Request, res: Response) => {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: process.env.EMAIL_TO!,
      subject: "Hello World",
      html: `<h1>El numero de licencias son, ${licenseNumber}</h1>`,
    });

    if (error) {
      return res.status(400).json({ error });
    }
    res.status(200).json({ data });
  });

  app.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
  });
}

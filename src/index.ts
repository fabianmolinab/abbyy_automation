import { chromium } from "playwright";
import { serverLicense } from "./email_config"

const selectors = {
  inputUsername: "input[id='userName']",
  inputPassword: "input[id='password']",
  butttonLogin: "input[id='loginButton']",
  divLicense: '//*[@id="SummaryGridsterContainer"]/li[2]/div[2]/div/div[6]',
};

async function getLicenseCount() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const link: string = process.env.ABBYLINK!;
  await page.goto(link);


  const user: string = process.env.ABBYYUSERNAME!;
  const password: string = process.env.ABBYPASSWORD!;

  const inputUser = page.locator(selectors.inputUsername);
  await inputUser.fill(user);

  const inputPassword = page.locator(selectors.inputPassword);
  await inputPassword.fill(password);

  const buttonLogin = page.locator(selectors.butttonLogin);

  await buttonLogin.click();

  const license: string | null = await page.textContent(
    selectors.divLicense
  );
  console.log(license);

  serverLicense(license);
}

getLicenseCount()


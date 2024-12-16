import { chromium } from "playwright";

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
}

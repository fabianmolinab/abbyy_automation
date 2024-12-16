import { expect, test } from "@playwright/test";
import { serverLicense } from "./email_config";

test.describe("login user page abby credencials", () => {
  const selectors = {
    inputUsername: "input[id='userName']",
    inputPassword: "input[id='password']",
    butttonLogin: "input[id='loginButton']",
    divLicense: '//*[@id="SummaryGridsterContainer"]/li[2]/div[2]/div/div[6]',
  };
  test.beforeEach(async ({ page }) => {
    const abbyLink: string = "ABBYLINK";
    const link: string = process.env[abbyLink]!;
    await page.goto(link);

    await expect(
      page.getByText("Log In to INETUM_Colombia_Prod")
    ).toBeVisible();
  });

  test("check available licenses", async ({ page }) => {
    await test.step('enter your login credentials PROD" ', async () => {
      const userName: string = "ABBYYUSERNAME";
      const userPassword: string = "ABBYPASSWORD";
      const user: string = process.env[userName]!;
      const password: string = process.env[userPassword]!;

      const inputUser = page.locator(selectors.inputUsername);
      await inputUser.fill(user);

      const inputPassword = page.locator(selectors.inputPassword);
      await inputPassword.fill(password);

      const buttonLogin = page.locator(selectors.butttonLogin);

      await buttonLogin.click();
      await expect(page.getByText("Administration & Monitoring")).toBeVisible();
    });

    await test.step("check the number of licenses is visible", async () => {
      const license: string | null = await page.textContent(
        selectors.divLicense
      );
      console.log(license);
      serverLicense(license);
    });
  });
});

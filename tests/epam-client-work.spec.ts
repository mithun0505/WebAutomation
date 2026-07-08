import { expect, test } from '@playwright/test';

class EpamHomePage {
  constructor(private readonly page) {}

  async goto() {
    await this.page.goto(process.env.BASE_URL ?? 'https://www.epam.com/');
  }

  async openServicesMenu() {
    const servicesMenu = this.page.getByRole('link', { name: 'Services', exact: true }).first();
    await expect(servicesMenu).toBeVisible();
    await servicesMenu.click({ force: true });
  }

  async openClientWork() {
    const exploreClientWork = this.page.getByRole('link', { name: 'Explore Our Client Work', exact: true }).first();
    await expect(exploreClientWork).toBeVisible();
    await exploreClientWork.click();
  }
}

test.describe('EPAM navigation', () => {
  test('should open Client Work from Services and verify the destination page', async ({ page }) => {
    const home = new EpamHomePage(page);

    // Navigate to the public EPAM homepage.
    await home.goto();

    // Open the Services menu from the site header.
    await home.openServicesMenu();

    // Select the Client Work entry from the expanded menu.
    await home.openClientWork();

    // Verify the destination page shows the expected Client Work text.
    await expect(page.getByText('Client Work', { exact: true })).toBeVisible();
  });
});

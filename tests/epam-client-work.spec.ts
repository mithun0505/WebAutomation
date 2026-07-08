import { test, expect } from '@playwright/test';

test('EPAM Services -> Explore Our Client Work shows Client Work text', async ({ page }) => {
  await page.goto('https://www.epam.com/');

  const servicesMenu = page.getByRole('link', { name: 'Services', exact: true }).first();
  await expect(servicesMenu).toBeVisible();
  await servicesMenu.click({ force: true });

  const exploreClientWork = page.getByRole('link', { name: 'Explore Our Client Work', exact: true }).first();
  await expect(exploreClientWork).toBeVisible();
  await exploreClientWork.click();

  await expect(page.getByText('Client Work', { exact: true })).toBeVisible();
});

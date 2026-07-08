import { test, expect } from '@playwright/test';

test('EPAM: Services -> Explore Our Client Work', async ({ page }) => {
  await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle');

  const servicesMenu = page.getByRole('link', { name: /Services/i });
  await expect(servicesMenu).toBeVisible({ timeout: 15000 });
  await servicesMenu.scrollIntoViewIfNeeded();
  await servicesMenu.hover();

  const clientWorkLink = page.getByRole('link', { name: /Explore Our Client Work/i });
  await expect(clientWorkLink).toBeVisible({ timeout: 10000 });
  await clientWorkLink.click();

  await page.waitForLoadState('domcontentloaded');

  const clientWorkText = page.getByText(/Client Work/i);
  await expect(clientWorkText).toBeVisible({ timeout: 15000 });
});

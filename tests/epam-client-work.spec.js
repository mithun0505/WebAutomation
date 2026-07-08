const { test, expect } = require('@playwright/test');

test('EPAM Services -> Explore Our Client Work shows Client Work text', async ({ page, context }) => {
  await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });

  await expect(page.getByRole('link', { name: /Services/i })).toBeVisible();
  await page.getByRole('link', { name: /Services/i }).click();

  const clientWorkLink = page.getByRole('link', { name: /Explore Our Client Work/i });
  await expect(clientWorkLink).toBeVisible();

  const popupPromise = page.waitForEvent('popup').catch(() => null);
  await clientWorkLink.click();
  const popup = await popupPromise;

  const destinationPage = popup || page;
  await destinationPage.waitForLoadState('domcontentloaded');
  await expect(destinationPage.getByText(/Client Work/i)).toBeVisible();
});

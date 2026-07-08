import { test, expect } from '@playwright/test';

test('EPAM Services -> Explore Our Client Work shows Client Work text', async ({ page, context }) => {
  await page.goto('https://www.epam.com/');

  const servicesMenu = page.getByRole('link', { name: 'Services' });
  await expect(servicesMenu).toBeVisible();
  await servicesMenu.hover();

  const exploreClientWork = page.getByRole('link', { name: 'Explore Our Client Work' });
  await expect(exploreClientWork).toBeVisible();

  const [newPage] = await Promise.all([
    context.waitForEvent('page').catch(() => null),
    exploreClientWork.click(),
  ]);

  const targetPage = newPage ?? page;
  await targetPage.waitForLoadState('domcontentloaded');

  await expect(targetPage.getByText('Client Work', { exact: false })).toBeVisible();
});

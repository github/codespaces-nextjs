import { test, expect } from '@playwright/test';

test.describe('Home Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should display the correct title', async ({ page }) => {
    const title = await page.locator('h1').textContent();
    expect(title).toBe('Fast Refresh Demo');
  });

  test('should increment the counter every second', async ({ page }) => {
    const counter = page.locator('text=Current value:');
    const initialValue = await counter.textContent();
    await page.waitForTimeout(2000); // Wait for 2 seconds
    const updatedValue = await counter.textContent();
    expect(parseInt(updatedValue.split(': ')[1])).toBe(parseInt(initialValue.split(': ')[1]) + 2);
  });

  test('should throw an error when button is clicked', async ({ page }) => {
    const button = page.locator('text=Throw an Error');
    await button.click();
    const errorOverlay = page.locator('text=An error occurred');
    await expect(errorOverlay).toBeVisible();
  });
});
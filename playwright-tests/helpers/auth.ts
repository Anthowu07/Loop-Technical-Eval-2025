import { Page } from '@playwright/test';

export async function login(page: Page, username: string, password: string) {
  await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
  await page.fill('#username', username);
  await page.fill('#password', password);
  await page.getByRole('button', { name: 'Sign in' }).click();
}
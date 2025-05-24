import { test, expect } from '@playwright/test';
import testData from '../test-data/testData.json';
import { login } from './helpers/auth';

test.describe('Card Verification Tests', () => {
    for (const data of testData) {
        test(`Should login as ${data.username} and go to the ${data.navbar} board. Then verify card "${data.card.header}" is in the "${data.column}" column`, async ({ page }) => {

            //Use helper function to login, for scalability, I decoupled the authentication process since more test cases will probably require logging in
            await login(page, data.username, data.password);

            // Navigate to specified board
            const nav = page.locator('nav.flex-1');
            await nav.locator('button', {
                has: page.locator('h2', { hasText: data.navbar }),
            }).click();

            // Find card in the given column (assumes that column names and card headers are unique)
            const column = page.locator('h2', { hasText: data.column }).locator('..');
            const card = column.locator('h3', { hasText: data.card.header}).locator('..');

            // Verifies expected tags in that card are visible
            for (const expectedTag of data.card.tags) {
                const tag = card.locator('span', { hasText: expectedTag });
                await expect(tag.first()).toBeVisible();
            }
        });
    }
});
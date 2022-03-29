import { test, expect } from '@playwright/test';

test('basic test', async ({ page, baseURL}) => {
    await page.goto('/regmaschine.html');
    //make locator to locate table with class memorytable
    const memtable = page.locator('#memoryTable');
    const memtable_spacing = await memtable.evaluate((ele) => {
        return window.getComputedStyle(ele).getPropertyValue('border-spacing');
    });
    expect(memtable_spacing).toBe('2px 2px');
    

    //check helptable background color
    const helptable = page.locator('.helptable');
    const helptable_color = await helptable.evaluate((ele) => {
        return window.getComputedStyle(ele).getPropertyValue('background-color');
    });
    expect(helptable_color).toBe('rgb(255, 237, 160)');


});
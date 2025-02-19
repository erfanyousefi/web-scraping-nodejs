import * as puppeteer from "puppeteer";
async function main () {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.setViewport({width: 1080, height: 1024});
    await page.goto("https://w3schools.com");
    await page.locator("#search2").fill("nodejs");
    await page.waitForSelector("#listofsearchresults>a");
    await page.click("#listofsearchresults>a");
    for (let index = 0; index < 30; index++) {
        await new Promise((resolve, _) => setTimeout(() => resolve(0), 2500));
        await page.waitForSelector("div.nextprev a.w3-right");
        await page.click("div.nextprev a.w3-right");
    }

}
main();
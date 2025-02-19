import {Browser, Builder, By, Key} from "selenium-webdriver";

async function main () {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get("https://w3schools.com");
    await driver.findElement(By.id("search2")).sendKeys("nodejs", Key.ENTER);
    for (let index = 0; index < 10; index++) {
        await driver.sleep(2000);
        await driver.findElement(By.css("div.nextprev a.w3-right")).click();
    }
}
main();
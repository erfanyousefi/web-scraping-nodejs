import * as puppeteer from "puppeteer";
const url = "https://ve.cbi.ir/DefaultVE.aspx";
async function main () {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: "networkidle2"});
    await page.waitForSelector("a#ctl00_lnk01");
    await page.click("a#ctl00_lnk01");
    await page.waitForSelector("#ctl00_ContentPlaceHolder1_tbIDNo");
    await page.waitForSelector("#ctl00_ContentPlaceHolder1_tbIDNo2");
    await page.waitForSelector("#ctl00_ContentPlaceHolder1_tbBrYear");
    await page.waitForSelector("#ctl00_ContentPlaceHolder1_ddlBrMonth");
    await page.waitForSelector("#ctl00_ContentPlaceHolder1_ddlBrDay");
    await page.waitForSelector("#ctl00_ContentPlaceHolder1_tbMarrYear");
    await page.waitForSelector("#ctl00_ContentPlaceHolder1_ddlMarryMonth");
    await page.waitForSelector("#ctl00_ContentPlaceHolder1_ddlMarryDay");
    await page.waitForSelector("#ctl00_ContentPlaceHolder1_tbMobileNo");


    await page.type("#ctl00_ContentPlaceHolder1_tbIDNo", '9297497780');
    await page.type("#ctl00_ContentPlaceHolder1_tbIDNo2", '6952316851');

    await page.type("#ctl00_ContentPlaceHolder1_tbBrYear", "1375");
    await page.select("#ctl00_ContentPlaceHolder1_ddlBrMonth", "12");
    await page.select("#ctl00_ContentPlaceHolder1_ddlBrDay", "20");

    await page.type("#ctl00_ContentPlaceHolder1_tbMarrYear", "1378");
    await page.select("#ctl00_ContentPlaceHolder1_ddlMarryMonth", "05");
    await page.select("#ctl00_ContentPlaceHolder1_ddlMarryDay", "10");

    await page.type("#ctl00_ContentPlaceHolder1_tbMobileNo", "09332255768");

}
main();
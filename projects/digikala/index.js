import * as cheerio from "cheerio";
import * as fs from "fs";
import * as puppeteer from "puppeteer";
async function fetchData () {
    // const {data} = await axios.get("https://www.digikala.com/search/?q=گوشی");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.digikala.com/search/?q=گوشی", {waitUntil: "networkidle2"});
    const content = await page.content();
    const $ = cheerio.load(content);
    let products = [];
    $("div.product-list_ProductList__item__LiiNI").each((index, element) => {
        const productCard = $(element);
        const link = productCard.find("a").attr("href");
        const image = productCard.find("picture source").attr("srcset");
        const title = productCard.find(".styles_VerticalProductCard__productTitle__6zjjN").text();
        const price = productCard.find("span[data-testid='price-final']").text();
        if (title && link) {
            products.push({
                title,
                link,
                image,
                price
            });
        }
    });
    fs.writeFileSync("./projects/digikala/products.json", JSON.stringify(products, null, 4), "utf-8");
    // await browser.close();
}
fetchData();
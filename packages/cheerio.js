import axios from "axios";
import * as cheerio from "cheerio";
import {writeFileSync} from "fs";
async function fetchData () {
    let url = "https://www.w3schools.com/mysql/default.asp";
    const {data} = await axios.get(url, {});
    const $ = cheerio.load(data);
    let reference = {};
    $("div#leftmenuinner a").each((index, item) => {
        const linkElement = $(item);
        reference[linkElement.text()] = `https://www.w3schools.com/mysql/${linkElement.attr("href")}`;
    });
    writeFileSync("reference.json", JSON.stringify(reference, null, 4), "utf-8");
}
fetchData();
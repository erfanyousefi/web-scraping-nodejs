import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";

const url = "https://www.iban.com/exchange-rates";
async function fetchData () {
    const {data} = await axios.get(url);
    let currencies = {};
    const $ = cheerio.load(data);
    $(".table.table-bordered.table-hover.downloads > tbody > tr").each((index, element) => {
        let tr = $(element);
        const [key, ...detail] = tr.find("td").toArray().map(td => $(td)?.text()?.trim()?.replace("\t", ''));
        currencies[key] = detail.filter(i => i.length > 0);
    });
    fs.writeFileSync("./projects/iban/currency.json", JSON.stringify(currencies, null, 4), "utf-8");
}
fetchData();
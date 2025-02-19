import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
const url = "https://www.sid.ir/search/paper/programming/fa/?page=2&sort=1&ftyp=all&fgrp=all&fyrs=1379%2c1402";
async function fetchJournal () {
    const {data} = await axios.get(url, {
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "en-US,en;q=0.9,fa;q=0.8",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "priority": "u=0, i",
            "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "cookie": "_ga_527SMQDZW6=GS1.1.1721039220.2.0.1721039220.0.0.0; __arcsjs=852af8da1b69d7682612adf70f02eb53; ASP.NET_SessionId=kbtn1z2m31x4hsaeecf20m0r; _gid=GA1.2.981241700.1733951472; _ga_HDNKEEGK46=GS1.1.1733951471.7.1.1733951481.50.0.0; _ga=GA1.1.640277722.1721034609",
            "Referer": "https://www.sid.ir/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
        }
    });
    const $ = cheerio.load(data);
    let journalList = [];
    $("#resultcontents .resultdetails").each((index, element) => {
        const journalContainer = $(element);
        const title = journalContainer.find(".srtitle").text();
        const link = journalContainer.find(".srtitle a").attr("href");
        const authors = journalContainer.find(".sras em a").text();
        const details = journalContainer.find(".srps ul li").toArray().map(li => $(li).text()?.replace("\n", ''));
        const journal = journalContainer.find(".srjs a").text();
        const keywords = journalContainer.find(".srks a").toArray().map(el => $(el).text()?.replace("\n", ''));
        journalList.push({
            title,
            link,
            authors,
            details,
            journal,
            keywords
        });

    });
    fs.writeFileSync("./projects/journal/list.json", JSON.stringify(journalList, null, 4), "utf-8");
}
fetchJournal();
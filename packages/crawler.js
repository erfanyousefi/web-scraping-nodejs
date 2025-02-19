import Crawler from "crawler";
import {writeFileSync} from "fs";
const crawler = new Crawler({
    rateLimit: 1000,
    callback: crawlerCallback
});
crawler.add({
    url: "https://www.w3schools.com/react/default.asp"
});
function crawlerCallback (err, res, done) {
    if (err) throw new Error(err?.message ?? err ?? "some thing wrongs!");
    const {$} = res;
    let reference = {};
    $("div#leftmenuinner a").each((index, item) => {
        const linkElement = $(item);
        reference[linkElement.text()] = `https://www.w3schools.com/react/${linkElement.attr("href")}`;
    });
    writeFileSync("reference-crawler.json", JSON.stringify(reference, null, 4), "utf-8");
    done();
}
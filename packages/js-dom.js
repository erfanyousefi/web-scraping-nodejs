import axios from "axios";
import {writeFileSync} from "fs";
import {JSDOM} from "jsdom";
async function fetchData () {
    let url = "https://www.w3schools.com/nodejs/default.asp";
    const {data} = await axios.get(url, {});
    const dom = new JSDOM(data);
    const document = dom.window.document;
    let reference = {};
    const linkItems = document.querySelectorAll("div#leftmenuinner a");
    linkItems.forEach((item) => {
        reference[item.textContent] = `https://www.w3schools.com/nodejs/${item.getAttribute("href")}`;
    });
    writeFileSync("reference-1.json", JSON.stringify(reference, null, 4), "utf-8");
}
fetchData();
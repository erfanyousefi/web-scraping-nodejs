import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
const url = "https://jobinja.ir/jobs?&filters%5Bjob_categories%5D%5B%5D=&filters%5Bkeywords%5D%5B0%5D=backend&filters%5Blocations%5D%5B%5D=&preferred_before=1733835849&sort_by=relevance_desc";
async function scrapJobs () {
    try {
        let jobs = [];
        for (let index = 1; index <= 10; index++) {
            const {data} = await axios.get(`${url}&page=${index}`, {
                "headers": {
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
                },
            });
            const $ = cheerio.load(data);
            $("ul.o-listView__list li").each((index, element) => {
                const jobCard = $(element);
                let details = [];
                jobCard.find("ul.o-listView__itemComplementInfo li.c-jobListView__metaItem").each((index, ele) => {
                    details.push($(ele).find("li span")?.text()?.trim()?.replace(/[\n]*/gm, '').replace(/\s{2,}/gm, ''));
                });
                let title = jobCard?.find("a.c-jobListView__titleLink")?.text()?.trim();
                let link = jobCard?.find("a.c-jobListView__titleLink")?.attr("href");
                if (title && link) {
                    jobs.push({
                        title,
                        link,
                        details
                    });
                }
            });
        }
        console.log(jobs.length);

        fs.writeFileSync("./projects/jobinja/jobs.json", JSON.stringify(jobs, null, 4));
    } catch (error) {
        console.log("Error in fetching data...");

    }
}
scrapJobs();



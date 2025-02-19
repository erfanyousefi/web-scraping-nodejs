const url = "https://github.com/search?type=repositories";
import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
async function findInGithub (term = '', page = 1) {
    let repositories = [];
    for (let index = 1; index <= page; index++) {
        const {data} = await axios.get(`${url}&q=${term ?? ''}&p=${page}`);
        const $ = cheerio.load(data);
        $("div[data-testid='results-list'] > div").each((index, element) => {
            const repository = $(element);
            const image = repository.find('img[data-component="Avatar"]').attr("src");
            const description = repository.find("div.dcdlju span").text();
            let link = repository.find('a.prc-Link-Link-85e08').attr("href");
            link = link ? `https://guthub.com${link}` : undefined;
            const date = repository.find("ul li div[title]").attr("title");
            const language = repository.find("ul li span[aria-label]").attr("aria-label");
            const stars = repository.find("ul li a[aria-label]").attr("aria-label");
            const technologies = repository.find("div.jgRnBg a").toArray().map(a => $(a).text());
            repositories.push({
                image,
                description,
                link,
                date,
                language,
                stars,
                technologies
            });
        });
    }
    console.log(repositories.length);

    fs.writeFileSync("./projects/github/repositories.json", JSON.stringify(repositories, null, 4), "utf-8");
}
findInGithub("expressjs mysql", 15);
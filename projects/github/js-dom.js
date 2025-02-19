const url = "https://github.com/search?type=repositories";
import axios from "axios";
import * as fs from "fs";
import {JSDOM} from "jsdom";
async function findInGithub (term = '', page = 1) {
    let repositories = [];
    for (let index = 1; index <= page; index++) {
        const {data} = await axios.get(`${url}&q=${term ?? ''}&p=${page}`);
        const dom = new JSDOM(data);
        const document = dom.window.document;
        const repositoryResult = document.querySelectorAll("div[data-testid='results-list'] > div");
        repositoryResult.forEach((repository) => {
            const image = repository.querySelector('img[data-component="Avatar"]').getAttribute("src");
            const description = repository.querySelector("div.dcdlju span")?.textContent?.trim();
            let link = repository.querySelector('a.prc-Link-Link-85e08').getAttribute("href");
            link = link ? `https://guthub.com${link}` : undefined;
            const date = repository.querySelector("ul li div[title]").getAttribute("title");
            const language = repository.querySelector("ul li span[aria-label]").getAttribute("aria-label");
            const stars = repository.querySelector("ul li a[aria-label]").getAttribute("aria-label");
            const technologies = Array.from(repository.querySelector("div.jgRnBg a") ?? {}).map(a => a.textContent?.trim());
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

    fs.writeFileSync("./projects/github/repositories-2.json", JSON.stringify(repositories, null, 4), "utf-8");
}
findInGithub("nestjs", 3);
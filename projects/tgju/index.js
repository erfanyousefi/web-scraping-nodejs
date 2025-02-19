import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
const url = "https://www.tgju.org/";
async function fetchData () {
    const {data} = await axios.get(url);
    const $ = cheerio.load(data);
    let tablesList = {};
    $("table").each((index, table) => {
        let tableKey;
        let tableData = [];
        $(table).find("tr").each((trIndex, row) => {
            let rowData = {};
            $(row).find("th, td").each((cellIndex, cell) => {
                const header = $(table).find("tr:first-child th").eq(cellIndex).text().trim();
                const cellValue = $(cell).text().trim();
                if (cellIndex === 0) tableKey = header;
                if (header && header !== cellValue) rowData[header] = cellValue;
            });
            if (Object.values(rowData)?.length > 0) tableData.push(rowData);
        });
        if (tableData?.length > 0) tablesList[tableKey] = tableData;
    });
    fs.writeFileSync("./projects/tgju/data.json", JSON.stringify(tablesList, null, 4).replace(/\\t/gmi, '')?.replace(/\\n/gmi, ' '), "utf-8");
}
fetchData();
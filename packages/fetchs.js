async function fetchData () {
    let url = "https://www.w3schools.com/mysql/default.asp";
    //axios
    // const result = await axios.get(url, {});

    //node-fetch
    // let result = await nodeFetch(url);
    // result = await result.text();

    //fetch - nodejs core module
    // let result = await fetch(url);
    // result = await result.text();

    //request-promise
    // const result = await request.get(url);

    //how to save html in files
    // fs.writeFileSync("w3schools-4.html", result, "utf-8");
}
fetchData();
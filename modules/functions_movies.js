import axios from "axios";
import {load} from "cheerio";
import {url_base} from "./modules/base_url.js";

export async function searchByName(title) {
    const page_fetch = await axios.get(url_base + "/search/?s=" + title);
    const $ = load(await page_fetch.data);

    const data_array = $("body div#default-tab-1 div.Posters a").map((index, element) => {
        const actual_element = $(element);
        return {
            "id": actual_element.attr("href").replace(url_base, "").trim(),
            "title": actual_element.find("div.listing-content p").text().trim(),
            "poster": actual_element.find("img").attr("src"),
            "type": actual_element.find("div.centrado").text().trim()
        };
    });
    return data_array.toArray();
};

export async function getMovieServers(id){
    const page_fetch = await axios.get(url_base + id);
    const $ = load(await page_fetch.data);
    const scripts = $("script");
    const serverNames = [];
    const videoUrls = [];
    const serverList = $('div.app div.layout ul.TbVideoNv li').map((i, e) => $(e).find('a').text().trim());
    for(let i = 0; i < scripts.length; i++){
        const actual_script = $(scripts[i]).html();
        if(actual_script.includes("var video =")){
            const urls = actual_script.match(/(https?:\/\/[^\s]+)/g);
            urls.forEach((e) => videoUrls.push(e.replace("';", "")));
        }
    };
    for(let i = 0; i < serverList.toArray().length; i++){
        serverNames.push({name: serverList[i], url: videoUrls[i]})
    };
    return serverNames;
};
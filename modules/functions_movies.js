import axios from "axios";
import {load} from "cheerio";
import {url_base} from "./base_url.js";

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
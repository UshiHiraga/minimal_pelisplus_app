import axios from "axios";
import {load} from "cheerio";
import {url_base} from "./base_url.js";

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
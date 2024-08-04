import axios from "axios";
import { PerTypeDetailInfo, PerTypeInfo } from "./types";
import { load } from "cheerio";
import { baseUrl } from "./parse";

export async function getTypeListData(typeArr: PerTypeInfo[]) {
  const pms = typeArr.map((item) => getPerTypeData(item));
  return (await Promise.all(pms)).flat();
}
export async function getPerTypeData(perItem: PerTypeInfo) {
  const perRes = await axios(perItem.url);
  const $ = load(perRes.data);
  const block = $(".wp_listalbumn");
  console.log(block.length);
  const res: PerTypeDetailInfo[] = [];
  if (block) {
    block.each((i, el) => {
      const name = $(el).text().trim();
      const desUrl = $(el).find("a").attr("href");
      const imgUrl = $(el).find("img").attr("src");
      //   console.log("type", desUrl);
      //   console.log("type", imgUrl);
      res.push({
        name,
        desUrl: `${baseUrl}${desUrl}`,
        imgUrl: `${baseUrl}${imgUrl}`,
        type: perItem.type,
      });
      // items.push({ type, url: `${baseUrl}${href}` });
    });
  }
  return res;
}

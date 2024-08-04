import axios from "axios";
import { PerTypeDetailInfo, PerTypeInfo } from "./types";
import { load } from "cheerio";
import { baseUrl } from "./parse";

export async function getTypeListData(typeArr: PerTypeInfo[]) {
  const pms = typeArr.map((item) => getPerTypeData(item));
  return (await Promise.all(pms)).flat();
}
export async function getPerTypeData(perItem: PerTypeInfo) {
  const res: PerTypeDetailInfo[] = [];
  let currentLength = 0;
  let pageSize = perItem.type === "材料表征平台" ? 12 : 16;
  let index = 0;
  do {
    const pageStr = `list${index || ""}.htm`;
    const perRes = await axios(
      perItem.url.replace("list.htm", `list${index || ""}.htm`)
    );
    const $ = load(perRes.data);
    const block = $(".Article_MicroImage");
    currentLength = block.length || 0;
    console.log("currentLength", perItem.type, pageStr, currentLength);
    if (block.length) {
      block.each((i, el) => {
        const name = $(el).find("a").attr("title");
        const desUrl = $(el).find("a").attr("href");
        const imgUrl = $(el).find("img").attr("src");
        res.push({
          name,
          desUrl: `${baseUrl}${desUrl}`,
          imgUrl: `${baseUrl}${imgUrl}`,
          type: perItem.type,
        });
      });
      if (index === 0) {
        index = index + 2;
      } else {
        index++;
      }
    }
  } while (currentLength && currentLength === pageSize);

  return res;
}

// import request from "request";
import axios from "axios";
import cheerio from "cheerio";
import { PerTypeInfo } from "./types";
import { getPerTypeData, getTypeListData } from "./perType";
export const baseUrl = `https://www2.scut.edu.cn`;
// 获取仪器列表

async function getTypeList() {
  const items: PerTypeInfo[] = [];
  const res = await axios(`${baseUrl}/mdrtc/jyjc/list.htm`);
  // console.log(res.data);
  if (res.data) {
    const $ = cheerio.load(res.data);

    $(".sub-item").each((i, el) => {
      console.log("iii", i);
      const type = $(el).text().trim();
      const href = $(el).find(".sub-item-link").attr("href");

      items.push({ type, url: `${baseUrl}${href}` });
    });
  }
  console.log("仪器平台列表", items);
  return items;
}

async function app() {
  const typeList = await getTypeList();
  const perTyepData = await getTypeListData(typeList);
  console.log(perTyepData, perTyepData.length);
}
app();
// getTypeList();
// get();
// getPerTypeData({
//   type: "动物实验平台",
//   url: "https://www2.scut.edu.cn/mdrtc/swxsypt/list.htm",
// });

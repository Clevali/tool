// import request from "request";
import axios from "axios";
import cheerio from "cheerio";
import { PerTypeInfo } from "./types";
import { getTypeListData } from "./perType";
import { writeJson } from "./write";
import { getAllDetailInfo } from "./getDetailInfo";
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
  const list = await getTypeListData(typeList);
  console.log("一共", list.length, "个");
  const result = await getAllDetailInfo(list);
  writeJson(result, "result.json");
}
console.log(app);
app();
// getTypeList();
// get();
// getPerTypeData({
//   type: "动物实验平台",
//   url: "https://www2.scut.edu.cn/mdrtc/swxsypt/list.htm",
// });
// getDetailInfo({
//   name: "高效液相色谱仪",
//   desUrl: "https://www2.scut.edu.cn/mdrtc/2021/0826/c30057a439297/page.htm",
//   imgUrl:
//     "https://www2.scut.edu.cn/_upload/article/images/fc/fc/ae4a885c481980e1fdee2c6ffe27/0db5a9b9-e26d-4746-a4a7-fe47828026a8_s.jpg",
//   type: "化学表征平台",
// });

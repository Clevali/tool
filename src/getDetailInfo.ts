import axios from "axios";
import { PerDetailInfo, PerTypeDetailInfo } from "./types";
import { load } from "cheerio";
// import asyncPool from "tiny-async-pool";

export async function getAllDetailInfo(list: PerTypeDetailInfo[]) {
  const result: PerDetailInfo[] = [];
  for await (const item of list) {
    console.log("item,", item);
    const res = await getDetailInfo(item);
    result.push(res);
  }
  return result;
}
export async function getDetailInfo(perTypeInfoItem: PerTypeDetailInfo) {
  const perRes = await axios(perTypeInfoItem.desUrl);
  const $ = load(perRes.data);
  //   console.log("perRes.data", perRes.data);
  const result: PerDetailInfo = {
    name: perTypeInfoItem.name,
    imgUrl: perTypeInfoItem.imgUrl,
    type: perTypeInfoItem.type,
    desUrl: perTypeInfoItem.desUrl,
    model: "",
    usName: "",
    factory: "",
    useTo: "",
    mainIndicators: [],
    principle: "",
    need: "",
  };
  $(".wp_articlecontent").each((i, el) => {
    const text = $(el).text().trim();

    // let str = "";
    // text.split("  ").forEach((item, index) => {});
    //   const regex = /仪器型号：(.+?)生产厂家/g;
    console.log(text);
    result.usName = matchStr({
      // reg: /\b[a-zA-Z]+\s+[a-zA-Z]+\b/,
      reg: /\s+(([a-zA-Z]+)|(\s+))*\s+/,
      render: (arr) => arr?.[0]?.trim() || "",
      // log: true,
      text,
    });
    result.model = matchStr({
      reg: /仪器型号：(.+?)生产厂家/g,
      text,
    });
    result.factory = matchStr({
      reg: /生产厂家：(.+?)\s/g,
      text,
    });
    result.useTo = matchStr({
      reg: /功能用途：(.+?)二、主要技术指标：/g,
      text,
    });
    result.mainIndicators = matchStr({
      reg: /主要技术指标：(.+?)三、工作原理：/g,
      text,
    })
      ?.split("；")
      .filter(Boolean);
    result.principle = matchStr({
      reg: /工作原理：(.+?)四、送样要求：/g,
      text,
    });
    result.need = matchStr({
      reg: /四、送样要求：(.+?)$/g,
      text,
    });
  });
  // console.log(result);
  return result;
}

function matchStr(params: {
  reg: RegExp;
  text: string;
  log?: boolean;
  render?: (matchArr: any[]) => string;
}) {
  const { reg, text, log, render } = params;
  const match = reg.exec(text);
  if (log) {
    console.log(match);
  }

  if (render) {
    return render(match);
  }
  return match?.[1]?.trim() || "";
}

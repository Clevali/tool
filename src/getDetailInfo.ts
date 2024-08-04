import axios from "axios";
import { PerDetailInfo, PerTypeDetailInfo } from "./types";
import { load } from "cheerio";

export async function getDetailInfo(perTypeInfoItem: PerTypeDetailInfo) {
  const perRes = await axios(perTypeInfoItem.desUrl);
  const $ = load(perRes.data);
  //   console.log("perRes.data", perRes.data);
  const result: PerDetailInfo = {
    name: perTypeInfoItem.name,
    imgUrl: perTypeInfoItem.imgUrl,
    type: perTypeInfoItem.type,
    model: "",
    usName: "",
    factory: "",
    useTo: "",
    mainIndicators: [],
    principle: "",
    need: "",
  };
  const arr: string[] = [];
  $(".wp_articlecontent").each((i, el) => {
    const text = $(el).text().trim();

    // let str = "";
    // text.split("  ").forEach((item, index) => {});
    //   const regex = /仪器型号：(.+?)生产厂家/g;
    result.usName = matchStr({
      reg: /\s+([a-zA-Z]+|\s+)\s+/,
      text,
    });
    result.model = matchStr({
      reg: /仪器型号：(.+?)生产厂家/g,
      text,
    });
    result.factory = matchStr({
      reg: /生产厂家：(.+?) 一、功能用途：/g,
      text,
    });
    result.useTo = matchStr({
      reg: /功能用途：(.+?)二、主要技术指标：/g,
      text,
    });
    result.mainIndicators = matchStr({
      reg: /主要技术指标：(.+?)三、工作原理：/g,
      text,
    })?.split("；");
    result.principle = matchStr({
      reg: /工作原理：(.+?)四、送样要求：/g,
      text,
    });
    result.need = matchStr({
      reg: /四、送样要求：(.+?)$/g,
      text,
    });

    console.log(result);
  });
}

function matchStr(params: { reg: RegExp; text: string }) {
  const { reg, text } = params;
  const match = reg.exec(text);

  return match?.[1]?.trim() || "";
}

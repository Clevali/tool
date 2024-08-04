export interface PerTypeInfo {
  type: string;
  url: string;
}
export interface PerTypeDetailInfo {
  name: string;
  desUrl: string;
  imgUrl: string;
  type: string;
}

export interface PerDetailInfo {
  name: string; // 名称
  imgUrl: string; // 图片
  type: string; // 类型
  usName: string; // 英文名
  model: string; // 型号
  factory: string; // 生产厂家
  useTo: string; // 用途
  mainIndicators: string[]; // 主要技术指标
  principle: string; // 工作原理
  need: string; // 送样要求
}

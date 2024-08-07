"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseUrl = void 0;
// import request from "request";
var axios_1 = require("axios");
var cheerio_1 = require("cheerio");
var perType_1 = require("./perType");
var write_1 = require("./write");
var getDetailInfo_1 = require("./getDetailInfo");
exports.baseUrl = "https://www2.scut.edu.cn";
// 获取仪器列表
function getTypeList() {
    return __awaiter(this, void 0, void 0, function () {
        var items, res, $_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    items = [];
                    return [4 /*yield*/, (0, axios_1.default)("".concat(exports.baseUrl, "/mdrtc/jyjc/list.htm"))];
                case 1:
                    res = _a.sent();
                    // console.log(res.data);
                    if (res.data) {
                        $_1 = cheerio_1.default.load(res.data);
                        $_1(".sub-item").each(function (i, el) {
                            console.log("iii", i);
                            var type = $_1(el).text().trim();
                            var href = $_1(el).find(".sub-item-link").attr("href");
                            items.push({ type: type, url: "".concat(exports.baseUrl).concat(href) });
                        });
                    }
                    console.log("仪器平台列表", items);
                    return [2 /*return*/, items];
            }
        });
    });
}
function app() {
    return __awaiter(this, void 0, void 0, function () {
        var typeList, list, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getTypeList()];
                case 1:
                    typeList = _a.sent();
                    return [4 /*yield*/, (0, perType_1.getTypeListData)(typeList)];
                case 2:
                    list = _a.sent();
                    console.log("一共", list.length, "个");
                    return [4 /*yield*/, (0, getDetailInfo_1.getAllDetailInfo)(list)];
                case 3:
                    result = _a.sent();
                    (0, write_1.writeJson)(result, "result.json");
                    return [2 /*return*/];
            }
        });
    });
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

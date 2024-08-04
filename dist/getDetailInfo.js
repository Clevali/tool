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
exports.getDetailInfo = getDetailInfo;
var axios_1 = require("axios");
var cheerio_1 = require("cheerio");
function getDetailInfo(perTypeInfoItem) {
    return __awaiter(this, void 0, void 0, function () {
        var perRes, $, result, arr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, axios_1.default)(perTypeInfoItem.desUrl)];
                case 1:
                    perRes = _a.sent();
                    $ = (0, cheerio_1.load)(perRes.data);
                    result = {
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
                    arr = [];
                    $(".wp_articlecontent").each(function (i, el) {
                        var _a;
                        var text = $(el).text().trim();
                        // let str = "";
                        // text.split("  ").forEach((item, index) => {});
                        //   const regex = /仪器型号：(.+?)生产厂家/g;
                        result.usName = matchStr({
                            reg: /\s+([a-zA-Z]+|\s+)\s+/,
                            text: text,
                        });
                        result.model = matchStr({
                            reg: /仪器型号：(.+?)生产厂家/g,
                            text: text,
                        });
                        result.factory = matchStr({
                            reg: /生产厂家：(.+?) 一、功能用途：/g,
                            text: text,
                        });
                        result.useTo = matchStr({
                            reg: /功能用途：(.+?)二、主要技术指标：/g,
                            text: text,
                        });
                        result.mainIndicators = (_a = matchStr({
                            reg: /主要技术指标：(.+?)三、工作原理：/g,
                            text: text,
                        })) === null || _a === void 0 ? void 0 : _a.split("；");
                        result.principle = matchStr({
                            reg: /工作原理：(.+?)四、送样要求：/g,
                            text: text,
                        });
                        result.need = matchStr({
                            reg: /四、送样要求：(.+?)$/g,
                            text: text,
                        });
                        console.log(result);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function matchStr(params) {
    var _a;
    var reg = params.reg, text = params.text;
    var match = reg.exec(text);
    return ((_a = match === null || match === void 0 ? void 0 : match[1]) === null || _a === void 0 ? void 0 : _a.trim()) || "";
}

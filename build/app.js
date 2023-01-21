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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const dotenv_1 = __importDefault(require("dotenv"));
const openai_1 = require("openai");
const api_1 = require("openai/dist/api");
dotenv_1.default.config();
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const whatsapp_web_js_1 = require("whatsapp-web.js");
const { OPENAI_API_KEY } = process.env;
const client = new whatsapp_web_js_1.Client({
    authStrategy: new whatsapp_web_js_1.LocalAuth(),
});
const configuration = new openai_1.Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new api_1.OpenAIApi(configuration);
const responseOpenAI = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        max_tokens: 2048,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["{}"],
    });
    return result.data.choices[0].text;
});
client.on("qr", (qr) => {
    qrcode_terminal_1.default.generate(qr, { small: true });
});
client.on("ready", () => console.log("Client is ready!"));
client.initialize();
client.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (message.body[0] === "*") {
            console.log(message.body);
            const response = yield responseOpenAI(message.body);
            if (response) {
                message.reply(response.trim());
            }
            else {
                message.reply("Ops! there is something wrong.");
            }
        }
        else if (message.body.toLowerCase() === "p") {
            message.reply("اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَا تُهُ");
        }
        else if (message.body.toLowerCase().includes("sticker") && message.hasMedia === true) {
            message.reply("On progress.");
        }
    }
    catch (error) {
        console.log(error);
    }
}));

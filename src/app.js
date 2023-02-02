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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const openai_1 = require("openai");
const api_1 = require("openai/dist/api");
const whatsapp_web_js_1 = require("whatsapp-web.js");
require("dotenv").config();
const qrcode = require("qrcode-terminal");
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
    console.log(qr);
    qrcode.generate(qr, { small: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsdURBQXVEO0FBQ3ZELDZCQUE2QjtBQUM3QixtQ0FBdUM7QUFDdkMseUNBQTRDO0FBQzVDLHFEQUFvRDtBQUNwRCxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDM0IsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFMUMsTUFBTSxFQUFFLGNBQWMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFdkMsTUFBTSxNQUFNLEdBQUcsSUFBSSx3QkFBTSxDQUFDO0lBQ3hCLFlBQVksRUFBRSxJQUFJLDJCQUFTLEVBQUU7Q0FDOUIsQ0FBQyxDQUFDO0FBRUgsTUFBTSxhQUFhLEdBQUcsSUFBSSxzQkFBYSxDQUFDO0lBQ3RDLE1BQU0sRUFBRSxjQUFjO0NBQ3ZCLENBQUMsQ0FBQztBQUVILE1BQU0sTUFBTSxHQUFHLElBQUksZUFBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRTVDLE1BQU0sY0FBYyxHQUFHLENBQU8sT0FBWSxFQUFFLEVBQUU7SUFDNUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsZ0JBQWdCLENBQUM7UUFDM0MsS0FBSyxFQUFFLGtCQUFrQjtRQUN6QixNQUFNLEVBQUUsT0FBTztRQUNmLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLEtBQUssRUFBRSxHQUFHO1FBQ1YsaUJBQWlCLEVBQUUsR0FBRztRQUN0QixnQkFBZ0IsRUFBRSxHQUFHO1FBQ3JCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQztLQUNiLENBQUMsQ0FBQztJQUVILE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3JDLENBQUMsQ0FBQSxDQUFDO0FBRUYsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRTtJQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hCLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDdkMsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztBQUUxRCxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7QUFFcEIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBTyxPQUFPLEVBQUUsRUFBRTtJQUNyQyxJQUFJO1FBQ0YsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQixNQUFNLFFBQVEsR0FBRyxNQUFNLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEQsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUNoQztpQkFBTTtnQkFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7YUFDakQ7U0FDRjthQUFNLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxHQUFHLEVBQUU7WUFDN0MsT0FBTyxDQUFDLEtBQUssQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO1NBQ3pFO2FBQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtZQUN0RixPQUFPLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQy9CO0tBQ0Y7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDcEI7QUFDSCxDQUFDLENBQUEsQ0FBQyxDQUFDIn0=
/* eslint-disable no-undef */
import dotenv from "dotenv";
import { Configuration } from "openai";
import { OpenAIApi } from "openai/dist/api";
dotenv.config();
import qrcode from "qrcode-terminal";
import { Client, LocalAuth } from "whatsapp-web.js";

const { OPENAI_API_KEY } = process.env;

const client = new Client({
  authStrategy: new LocalAuth(),
});

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const responseOpenAI = async (message: any) => {
  const result = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: message,
    max_tokens: 2048,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["{}"],
  });

  return result.data.choices[0].text;
};

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => console.log("Client is ready!"));

client.initialize();

client.on("message", async (message) => {
  try {
    if (message.body[0] === "*") {
      console.log(message.body);
      const response = await responseOpenAI(message.body);
      if (response) {
        message.reply(response.trim());
      } else {
        message.reply("Ops! there is something wrong.");
      }
    } else if (message.body.toLowerCase() === "p") {
      message.reply("اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَا تُهُ");
    } else if (message.body.toLowerCase().includes("sticker") && message.hasMedia === true) {
      message.reply("On progress.");
    }
  } catch (error) {
    console.log(error);
  }
});

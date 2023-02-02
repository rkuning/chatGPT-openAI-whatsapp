/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import { Configuration } from "openai";
import { OpenAIApi } from "openai/dist/api";
import { Client, LocalAuth } from "whatsapp-web.js";
require("dotenv").config();
const express = require("express");
const app = express();
const bp = require("body-parser");
const qr = require("qrcode");
const cors = require("cors");

const { OPENAI_API_KEY, PORT } = process.env;

const client = new Client({
  authStrategy: new LocalAuth(),
});

// ? configure open ai
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// ? configure express
app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(cors());
app.use(bp.json());

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

let codeQr;
let message;

client.on("qr", (qr) => {
  console.log(qr);
  codeQr = qr;
});

client.on("ready", () => {
  message = "Chat GPT Ready!";
  console.log(message);
});

client.initialize();

client.on("message", async (message: any) => {
  try {
    if (message.body[0] === "!") {
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

app.get("/", (req: any, res: any) => {
  try {
    if (!codeQr && message === undefined) {
      res.send("wait!");
    } else {
      qr.toDataURL(codeQr, (err, src) => {
        if (err) res.send("Error occured");
        !message
          ? res.render("index", { qr: src, message: "" })
          : res.render("index", { qr: src, message: "Chat GPT Ready!" });
        // Let us return the QR code image as our response and set it to be the source used in the webpage
      });
    }
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => console.log(`server already running on port : ${PORT}..`));

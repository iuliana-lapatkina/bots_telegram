const { Telegraf } = require('telegraf');

bot = new Telegraf('#'); //указать токен бота

const chatId = #; //указать message.chat.id
const intervalMs = 5000;
const getCatUrl = () => `https://cataas.com/cat?t=${new Date().getTime()}`;

const sendCat = () => {
  bot.telegram.sendPhoto(chatId, getCatUrl()).then(() => setTimeout(sendCat, intervalMs));
}

sendCat();
const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf('#'); //указать токен бота

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getCoinSide = () => getRandomInt(0, 1) === 0 ? 'Орёл' : 'Решка';

const coinInlineKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Подбросить ещё раз', 'flip_a_coin'),
]);
bot.hears('Подбросить монетку', ctx => ctx.reply(getCoinSide(), coinInlineKeyboard));
bot.action('flip_a_coin', async(ctx) => {
  await ctx.editMessageText(`${getCoinSide()}   ${new Date().toLocaleString("ru-RU")}`, coinInlineKeyboard);
});

const getRandomNumber = () => getRandomInt(0, 100);
const numberInlineKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Сгенерировать новое', 'random_number'),
]);

bot.hears('Случайное число', ctx => ctx.reply(getRandomNumber().toString(), numberInlineKeyboard));
bot.action('random_number', async(ctx) => {
  await ctx.editMessageText(`${getRandomNumber()}   ${new Date().toLocaleString("ru-RU")}`, numberInlineKeyboard);
});

bot.use(async (ctx) => {
  await ctx.reply('Что нужно сделать?', Markup.keyboard([
    'Подбросить монетку', 'Случайное число']).resize()
    )
});

bot.launch().then(() => console.log('Started'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

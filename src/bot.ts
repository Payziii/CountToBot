// Importing required packages
import "dotenv/config";
import { Bot, session, Context } from "grammy";
import {
    type ConversationFlavor,
    conversations,
    createConversation,
} from "@grammyjs/conversations";
import { I18n, I18nFlavor } from "@grammyjs/i18n";

// Creating a bot
type MyContext = Context & ConversationFlavor & I18nFlavor;
const bot = new Bot<MyContext>(process.env.BOT_TOKEN);

// Connecting translation
const i18n = new I18n<MyContext>({
    defaultLocale: "en",
    directory: "locales",
});

// Connecting dependencies
bot.use(session({ initial: () => ({}) }));
bot.use(i18n);
bot.use(conversations());

// Creating a start command
bot.command("start", async (ctx) => {
    ctx.reply(ctx.t('start-command'));
});

// Starting a bot
bot.start();
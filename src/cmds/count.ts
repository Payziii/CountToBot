// Importing required packages and files
import { Context, Keyboard } from "grammy";
import {
    type Conversation,
    type ConversationFlavor,
} from "@grammyjs/conversations";
import { I18nFlavor } from "@grammyjs/i18n";
import { isValidDate } from "../functions/dateValidator.js";
import { convertDate } from "../functions/toCorrecDate.js";
import { getTimezone } from "../functions/getTimezone.js";
import { newCounter } from "../db.js";

// Creating types
type MyContext = Context & ConversationFlavor & I18nFlavor;
type MyConversation = Conversation<MyContext>;

export async function count(conversation: MyConversation, ctx: MyContext) {
    // Get event name
    await ctx.reply(ctx.t("count-enter-name"));
    const raw_name = await conversation.waitFrom(ctx.from);
    const name = raw_name?.message?.text || ctx.t("unknown-count-name")

    // Get event date
    await ctx.reply(ctx.t("count-enter-date"));
    const raw_date = await conversation.waitFrom(ctx.from);
    const date = raw_date?.message?.text
    if (!isValidDate(date)) return ctx.reply(ctx.t("count-invalid-date"))

    // Get user location
    const keyboard = new Keyboard().requestLocation(ctx.t("count-button-timezone")).oneTime();
    await ctx.reply(ctx.t("count-enter-timezone"), {
        reply_markup: keyboard,
    });
    const raw_tz = await conversation.waitFrom(ctx.from);
    const tz = raw_tz?.message?.location
    let location = ''
    if (tz) location = `${tz.latitude},${tz.longitude}`
    else location = raw_tz?.message?.text || "Moscow"

    // Get user timezone
    const timezone = await conversation.external(() => getTimezone(location));
    if (timezone.error) return ctx.reply(ctx.t("count-invalid-timezone"))

    // Create a counter
    const counter = await conversation.external(() => newCounter(ctx.from.id, name, timezone?.location?.tz_id, convertDate(date)));
    ctx.reply(ctx.t("count-created", { name: name, timezone: timezone?.location?.tz_id, date: date }), {
        reply_markup: { remove_keyboard: true },
    });
}
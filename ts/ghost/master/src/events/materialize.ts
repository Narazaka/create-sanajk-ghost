import { events } from "../shioriBuilder";
const r = String.raw;

events.OnBoot = (ctx) =>
    r`\0\s[0]起動しました。\n` +
    r`\1\s[10]シェル名は${ctx.request.headers.Reference(0)}です。\e`;

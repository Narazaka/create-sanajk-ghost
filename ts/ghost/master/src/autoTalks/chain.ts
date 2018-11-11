import { auto, autow, chain, chainw, endchain, endchainw } from "sanajk";
import { autoTalks } from "../shioriBuilder";

const r = String.raw;

autoTalks.add(
    r`\0\s[0]自動発話中にチェイントークを含めることもできます。\e`,
    chain(
        r`\0\s[0]チェイントークが抽選されると……\e`,
        r`\0\s[0]その後チェイントークの要素が終了するまでは……\e`,
        r`\0\s[0]自動発話の度にチェイントークが順次発話されます。\e`,
        (ctx) => r`\0\s[0]このチェイントークには${ctx.state.autoTalkChooser.chainTalk!.topChainTalks.size}個の要素があります。\e`,
    ),
    chainw(
        5,
        ["foo"],
        r`\0\s[0]チェイントークにも重みやタグが付けられます。\e`,
        r`\0\s[0]チェイントークのデフォルトの重みはautoでの自動発話と異なり1です。\e`,
        r`\0\s[0]チェイントークの要素数で重みが変わるのは直感的ではないのでこうなっています。\e`,
    ),
    chain(
        r`\0\s[0]チェイントークの中でランダム要素を使うことも……\e`,
        auto(
            r`\0\s[0]できます。\e`,
            r`\0\s[0]できるにょ。\e`,
        ),
        r`\0\s[0]柔軟な設定が可能です。\e`,
    ),
    chain(
        r`\0\s[0]チェイントークを連鎖させることも出来ます。\e`,
        chain(
            r`\0\s[0]1番目\e`,
            r`\0\s[0]2番目\e`,
        ),
        r`\0\s[0]3番目\e`,
        auto(
            r`\0\s[0]4番目(50%の確率)\e`,
            r`\0\s[0]4番目(50%の確率)\e`,
        ),
        r`\0\s[0]5番目\e`,
        auto(
            chainw(
                3,
                r`\0\s[0]6番目(75%の確率)\e`,
                r`\0\s[0]7番目(75%の確率)\e`,
            ),
            chain(
                r`\0\s[0]6番目(25%の確率)\e`,
                r`\0\s[0]7番目(25%の確率)\e`,
            ),
        ),
        r`\0\s[0]8番目\e`,
        auto(
            chainw(
                () => new Date().getDay() === 0 ? 1 : 0,
                r`\0\s[0]9番目(日曜日)\e`,
                r`\0\s[0]10番目(日曜日)\e`,
            ),
            chainw(
                () => new Date().getDay() !== 0 ? 1 : 0,
                r`\0\s[0]9番目(日曜日以外)\e`,
                r`\0\s[0]10番目(日曜日以外)\e`,
            ),
        ),
        r`\0\s[0]10番目\e`,
        r`\0\s[0]条件分岐のような事も出来ますね。\e`,
    ),
    chain(
        ["bar"],
        r`\0\s[0]endchainを使うと元のチェイントークに戻らない連鎖も出来ます。\e`,
        r`\0\s[0]1番目\e`,
        endchain(
            r`\0\s[0]2番目\e`,
            r`\0\s[0]3番目\e`,
            chain(
                r`\0\s[0]4番目\e`,
                r`\0\s[0]5番目\e`,
            ),
            r`\0\s[0]6番目\e`,
            auto(
                endchainw(
                    3,
                    r`\0\s[0]7番目(75%の確率)\e`,
                    r`\0\s[0]8番目(75%の確率)\e`,
                    (ctx) => {
                        ctx.state.autoTalkChooser.tags = new Set(["NEXTCHAIN"]);
                        return r`\0\s[0]タグ付きチェイントークの終わりで別のタグを指定すれば、` +
                            r`アドベンチャーゲームの選択肢ジャンプのような事も出来ると思います。\e`;
                    },
                ),
                chain(
                    r`\0\s[0]7番目(25%の確率)\e`,
                    r`\0\s[0]8番目(25%の確率)\e`,
                ),
            ),
            r`\0\s[0]9番目(25%の確率)\e`,
        ),
        r`\0\s[0]発話されない\e`,
    ),
    chain(
        ["NEXTCHAIN"],
        r`\0\s[0]9番目(75%の確率)\e`,
        r`\0\s[0]10番目(75%の確率)\e`,
    ),
);
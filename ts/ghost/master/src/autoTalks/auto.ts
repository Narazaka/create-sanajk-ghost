import { auto, autow, chain, chainw, endchain, endchainw } from "sanajk";
import { autoTalks } from "../shioriBuilder";

autoTalks.add(
    auto((ctx) => ctx.state.dirpath),
);

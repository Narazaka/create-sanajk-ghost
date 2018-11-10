const FileSystemObject = require("fso").FileSystemObject;
const shell = require("shelljs");

const lf = "\x0a";

const deleteJsFiles = [
    "SaveData",
    "State",
    "shiorack"
];
const deleteJsFileLineRe = new RegExp(`^.*require\\(.*\\b(?:${deleteJsFiles.join("|")})"\\);\r?${lf}?`, "gm");

shell.cp("-R", "ts", "js");
shell.cp("-R", "overwrite/js/{*,.*}", "js");
shell.rm("-rf", "js/ghost/master/lib");
shell.rm("-rf", "js/ghost/master/tsconfig.json", "js/ghost/master/tslint.json");
shell.mv("js/ghost/master/src", "js/ghost/master/lib");
shell.rm("-rf", ...deleteJsFiles.map(jsFile => `js/ghost/master/lib/${jsFile}.ts`));

/** @param {FileSystemObject} tsFile */
function convertJs(tsFile) {
    const content = tsFile.readFileSync("utf8");
    const exportSymbols = [];
    const result = content
        .replace(/^import "([^"]+)";/gm, 'require("$1");')
        .replace(/^import {([^}]+)} from "([^"]+)";/gm, 'const {$1} = require("$2");')
        .replace(/^import \* as (\w+) from "([^"]+)";/gm, 'const $1 = require("$2");')
        .replace(deleteJsFileLineRe, "")
        .replace(/!\./g, ".")
        .replace(/^export =/gm, 'module.exports =')
        .replace(
            /^export (const|class|function) (\w+)/gm,
            (sub, type, symbol) => {
                exportSymbols.push(symbol);
                return `${type} ${symbol}`;
            }
        )
        .replace(/^const (\w+):([\s\S]+?) = /gm, "const $1 = ")
        .replace(/ as \w+/g, '')
        .replace(/<[\w, ]+>\(/g, '(') +
        (
            exportSymbols.length ?
            `${lf}module.exports = { ${exportSymbols.join(", ")} };${lf}` :
            ""
        );
    tsFile.unlinkSync();
    const jsFile = tsFile.parent().join(tsFile.basename().path.replace(/\.ts$/, ".js"));
    jsFile.writeFileSync(result);
}

const tsDir = new FileSystemObject("js/ghost/master/lib");
for (const child of tsDir.childrenAllSync()) {
    if (child.extname() === ".ts") {
        convertJs(child);
    }
}

#!/usr/bin/env node

process.env.DEBUG = "*";

const fs = require("fs");
const path = require("path");
const shell = require("shelljs");
const debug = require("debug");
const program = require('commander');
const package = require("./package.json");
const downloadNodeExe = require("./downloadNodeExe");
const downloadShiolink = require("./downloadShiolink");

const error = debug("ERROR");
const info = debug("INFO");

const types = ["ts", "ts-node", "js"];

program
    .version(package.version)
    .description(package.description)
    .arguments('<directory>')
    .option("-t, --type [type]", `source type [${types.join(", ")}]`, "ts")
    .option("-f, --force", "overwrite files")
    .parse(process.argv);

if (program.args.length !== 1 || types.indexOf(program.type) === -1) {
    program.help();
}

async function main(directory, type, force) {
    if (fs.existsSync(directory) && !force) {
        error("directory already exists!");
        return;
    }
    info("create directory [%s]", directory);
    shell.mkdir("-p", directory);
    info("copying contents to [%s]", directory);
    shell.cp("-R", __dirname + `/${type}/{*,.*}`, directory);
    const installTxtPath = path.join(directory, "install.txt");
    info("rewrite [%s]", installTxtPath);
    const installTxtContent = fs.readFileSync(installTxtPath, "utf8").replace(/DIR/, path.basename(directory));
    fs.writeFileSync(installTxtPath, installTxtContent);
    const ghostMasterDirectory = path.join(directory, "ghost/master");
    info("downloading SHIOLINK to [%s]", directory);
    await downloadShiolink(ghostMasterDirectory);
    info("downloading node.exe to [%s]", directory);
    await downloadNodeExe(ghostMasterDirectory);
    shell.cd(ghostMasterDirectory);
    info("installing npm modules to [%s]", ghostMasterDirectory);
    shell.exec("npm install");
    info("done");
}

main(program.args[0], program.type, program.force);

process.env.DEBUG = "*";

const shell = require("shelljs");
const debug = require("debug");
const info = debug("ts-node");
const error = debug("ts-node:error");

const exec = (cmd) => {
    info(cmd);
    const {code} = shell.exec(cmd);
    if (code) {
        error(`exit code was [${code}]`);
        process.exit(1);
    }
};

shell.cd("ts-node/ghost/master");
exec("npm install");
exec("node_modules\\.bin\\ts-node -P tsconfig.json -e \"import shiori = require('./lib/shiori'); import { exit } from '../../../test/helper/processExit'; console.log(shiori); exit();\"");

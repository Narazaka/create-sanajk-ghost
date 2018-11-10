process.env.DEBUG = "*";

const shell = require("shelljs");
const debug = require("debug");
const info = debug("ts");
const error = debug("ts:error");

const exec = (cmd) => {
    info(cmd);
    const {code} = shell.exec(cmd);
    if (code) {
        error(`exit code was [${code}]`);
        process.exit(1);
    }
};

shell.cd("ts/ghost/master");
exec("npm install");
exec("npm run build");
exec("node -e \"console.log(require('./lib/shiori')); process.exit();\"");

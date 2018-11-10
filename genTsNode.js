const shell = require("shelljs");

shell.cp("-R", "ts", "ts-node");
shell.cp("-R", "overwrite/ts-node/{*,.*}", "ts-node");
shell.rm("-rf", "ts-node/ghost/master/lib");
shell.mv("ts-node/ghost/master/src", "ts-node/ghost/master/lib");

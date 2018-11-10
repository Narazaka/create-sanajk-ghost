// @ts-check

const fetch = require("node-fetch").default;
const FileSystemObject = require("fso").FileSystemObject;
const JSZip = require("jszip");

const shiolinkUrl = "https://storage.googleapis.com/google-code-archive-downloads/v2/code.google.com/shiori-basic/SHIOLINK_1_3_0_0.nar";

module.exports = async function downloadShiolink(directory) {
    const targetDirectory = new FileSystemObject(directory);
    const res = await fetch(shiolinkUrl);
    if (!res.ok) throw new Error(res.statusText);
    const zip = await JSZip.loadAsync(await res.buffer());
    targetDirectory.join("SHIOLINK.dll").writeFileSync(await zip.file("SHIOLINK_1_3_0_0/SHIOLINK/ghost/master/SHIOLINK.dll").async("nodebuffer"));
    targetDirectory.join("SHIOLINK-readme.txt").writeFileSync(await zip.file("SHIOLINK_1_3_0_0/SHIOLINK/readme.txt").async("nodebuffer"));
}

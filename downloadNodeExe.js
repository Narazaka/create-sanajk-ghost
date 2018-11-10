// @ts-check

const fetch = require("node-fetch").default;
const FileSystemObject = require("fso").FileSystemObject;
const JSZip = require("jszip");

const nodeIndexUrl = "https://nodejs.org/download/release/index.json";
const nodejsUrl = (version) => `https://nodejs.org/download/release/${version}/node-${version}-win-x86.zip`;

module.exports = async function downloadNodeExe(directory) {
    const targetDirectory = new FileSystemObject(directory);
    const jsonRes = await fetch(nodeIndexUrl);
    if (!jsonRes.ok) throw new Error(jsonRes.statusText);
    const latestVersion = (await jsonRes.json())[0].version;
    const res = await fetch(nodejsUrl(latestVersion));
    if (!res.ok) throw new Error(res.statusText);
    const zip = await JSZip.loadAsync(await res.buffer());
    targetDirectory.join("node.exe").writeFileSync(await zip.file(`node-${latestVersion}-win-x86/node.exe`).async("nodebuffer"));
    targetDirectory.join("node-LICENSE").writeFileSync(await zip.file(`node-${latestVersion}-win-x86/LICENSE`).async("nodebuffer"));
}

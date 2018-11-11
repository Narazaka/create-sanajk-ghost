# create-sanajk-ghost

[![npm](https://nodei.co/npm/create-sanajk-ghost.png)](https://www.npmjs.com/package/create-sanajk-ghost)
[![npm](https://img.shields.io/npm/v/create-sanajk-ghost.svg)](https://www.npmjs.com/package/create-sanajk-ghost)
[![npm license](https://img.shields.io/npm/l/create-sanajk-ghost.svg)](https://www.npmjs.com/package/create-sanajk-ghost)
[![Travis Build Status](https://travis-ci.org/Narazaka/create-sanajk-ghost.svg?branch=master)](https://travis-ci.org/Narazaka/create-sanajk-ghost)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/Narazaka/create-sanajk-ghost?svg=true&branch=master)](https://ci.appveyor.com/project/Narazaka/create-sanajk-ghost)

伺かゴースト最初の一歩を[SanaJK](https://github.com/Narazaka/sanajk)で始めるためのツール

## Install / インストール

```bash
npm install -g create-sanajk-ghost
```

## Usage / ゴーストを作る

```bash
# with TypeScript
create-sanajk-ghost ./ghost/myghost
# with TypeScript and ts-node
create-sanajk-ghost -t ts-node ./ghost/myghost
# with JavaScript
create-sanajk-ghost -t js ./ghost/myghost
```

## make nar / narを作る

```bash
cd ./ghost/myghost/ghost/master
npm run nar
```

## License / ライセンス

[Zlib License](https://narazaka.net/license/Zlib?2018)

# electron-vite-boilerplate

A Electron + Vite boilerplate of the nature of learning.

*学习性的 Electron + Vite 样板工程!*

[![awesome-vite](https://awesome.re/badge.svg)](https://github.com/vitejs/awesome-vite)
[![Required Node.JS >= v14.17.0](https://img.shields.io/static/v1?label=node&message=%3E=14.17.0&logo=node.js&color=3f893e)](https://nodejs.org/about/releases)
[![GitHub license](https://img.shields.io/github/license/caoxiemeihao/electron-vite-boilerplate)](https://github.com/electron-vite/electron-vite-boilerplate/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/caoxiemeihao/electron-vite-boilerplate?color=fa6470)](https://github.com/electron-vite/electron-vite-boilerplate)

- 📦 Out of the box  
- 🚚 Include only necessary dependencies  

![screenshot](https://raw.githubusercontent.com/electron-vite/electron-vite-boilerplate/main/packages/renderer/public/screenshot-transparent.png)

## Run Setup

```sh
# clone the project
git clone https://github.com/electron-vite/electron-vite-boilerplate.git

# enter the project directory
cd electron-vite-boilerplate

# install dependency
npm install

# develop
npm run dev
```

## Directory

Once `dev` or `build` npm-script executed will be generate named `dist` folder. It has children dir of same as `packages` folder, the purpose of this design can ensure the correct path calculation.

*一旦 `dev` 或 `build` 命令执行过后，将会生成与 `packages` 相同结构 `dist` 文件夹，这样设计的目的是保障构建后路径计算的正确性。*

```tree
├── dist                      After build, it's generated according to the "packages" directory
│   ├── main/
│   ├── preload/
│   └── renderer/
│
├── scripts
│   ├── build.mjs             npm run build
│   └── watch.mjs             npm run dev
│
└── packages
    ├── main                  Main-process source code
    │   └── vite.config.ts
    ├── preload               Preload-scripts source code
    │   └── vite.config.ts
    └── renderer              Renderer-process source code
        └── vite.config.ts
```

## FAQ

- [dependencies vs devDependencies](https://github.com/electron-vite/vite-plugin-electron-renderer#dependencies-vs-devdependencies)
- [C/C++ addons, Node.js modules - Pre-Bundling](https://github.com/electron-vite/vite-plugin-electron-renderer#dependency-pre-bundling)

## 🍵 🍰 🍣 🍟

<img width="270" src="https://github.com/caoxiemeihao/blog/blob/main/assets/$qrcode/$.png?raw=true">

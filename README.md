# electron-vite-boilerplate

![GitHub license](https://img.shields.io/github/license/caoxiemeihao/electron-vite-boilerplate)

## Overview

- Enabled `Electron` and `NodeJs` in `Renderer-process` by **[vitejs-plugin-electron](https://www.npmjs.com/package/vitejs-plugin-electron)**.
- Use `Vite` build `Renderer-process`.
- Use `esbuild` build `Main-process` and `Preload-script`.

## Run Setup

  ```bash
  # clone the project
  git clone git@github.com:caoxiemeihao/electron-vite-boilerplate.git

  # enter the project directory
  cd electron-vite-boilerplate

  # install dependency(recommend use pnpm)
  pnpm install

  # develop
  npm run dev
  ```

## Directory

Once `dev` or `build` npm-script executed will be generate named `dist` folder. It has children dir of same as `src` folder, the purpose of this design can ensure the correct path calculation.

```tree
├── dist              'src' build generation
├   ├── main
├   ├── preload
├   ├── renderer
├
├── scripts
├   ├── build.js      Build script, for -> npm run build
├   ├── esbuild.js
├   ├── watch.js      Develop script, for -> npm run dev
├
├── src
├   ├── main          Main-process source code
├   ├── preload       Preload-script source code
├   ├── renderer      Renderer-process source code
├
```

## Branch

#### [webpack](https://github.com/caoxiemeihao/electron-vite-boilerplate/tree/webpack)

  - [x] supported `sqlite3`

首先在当前文件夹初始化
yarn init --yes
在package.json添加入口文件bin指定文件路径cli.js
新建cli.js文件
在 cli.js增加 特定的头部 (在linux 或macos 需要改文件的读写权限 为 755)
#! /usr/bin/env node

yarn link 进行发布

yarn add inquirer
使用inquirer.prompt 发起命令行询问
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

 npm run build

# 进入生成的文件夹
cd ./dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:fecym/video-player.git master:gh-pages

cd -